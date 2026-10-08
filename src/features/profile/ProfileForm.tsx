import { useState, type FormEvent, type JSX } from 'react'
import { User as UserIcon, Mail, MapPin, Camera, Save, Check } from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { useToast } from '@/hooks/useToast'
import { Avatar } from '@/components/ui/Avatar'

export function ProfileForm(): JSX.Element {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const toast = useToast()

  const [name, setName] = useState(user?.name || 'Zahidul Islam')
  const [email, setEmail] = useState(user?.email || 'zahid@example.com')
  const [location, setLocation] = useState(user?.location || 'Kyoto, Japan')
  const [bio, setBio] = useState(
    user?.bio || 'Passionate cultural explorer, architecture enthusiast, and travel photographer.'
  )
  const [isSaved, setIsSaved] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const updated = {
      ...(user || { id: 'u-1', email }),
      name: name.trim(),
      email: email.trim(),
      location: location.trim(),
      bio: bio.trim(),
    }

    setUser(updated)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
    toast.success('Your profile details have been saved!', 'Profile Updated')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-5 text-left"
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
        <UserIcon className="h-4 w-4 text-neutral-500" />
        <h3 className="text-sm font-bold text-neutral-900">Personal Information</h3>
      </div>

      {/* Avatar Header */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Avatar size="xl" fallback={name.slice(0, 2)} />
          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xs hover:bg-neutral-800 cursor-pointer"
            title="Change photo"
          >
            <Camera className="h-3 w-3" />
          </button>
        </div>

        <div>
          <h4 className="text-sm font-bold text-neutral-900">{name}</h4>
          <p className="text-xs text-neutral-500">{email}</p>
          <span className="inline-block mt-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
            {user?.isPro ? 'Pro Member' : 'Free Account'}
          </span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Full Name</label>
          <div className="relative">
            <UserIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-9 rounded-xl border border-neutral-200 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-neutral-700 block mb-1">Email Address</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 rounded-xl border border-neutral-200 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-700 block mb-1">Home Location</label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className="w-full h-9 rounded-xl border border-neutral-200 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-neutral-700 block mb-1">Bio / Travel Style</label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell tripmates about your favorite destinations..."
          className="w-full rounded-xl border border-neutral-200 p-3 text-xs focus:ring-1 focus:ring-primary-400 focus:outline-none leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-end pt-2 border-t border-neutral-100">
        <button
          type="submit"
          className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
            isSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-primary-400 text-neutral-900 hover:bg-primary-500 shadow-2xs'
          }`}
        >
          {isSaved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          <span>{isSaved ? 'Changes Saved' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  )
}
