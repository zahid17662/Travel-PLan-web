export interface Member {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'owner' | 'editor' | 'viewer'
  status?: 'active' | 'invited'
}
