import { useEffect, type JSX, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Calendar, Compass, DollarSign, FileCheck, CheckSquare } from 'lucide-react'
import type { Trip } from '@/types'
import { useTripStore } from '@/store/trip.store'
import { PlannerHeader } from './PlannerHeader'
import { MapPanel } from './MapPanel'
import { MobileMapSheet } from './MobileMapSheet'
import { ItineraryTab } from './tabs/ItineraryTab'
import { OverviewTab } from './tabs/OverviewTab'
import { ExploreTab } from './tabs/ExploreTab'
import { ReservationsTab } from './tabs/ReservationsTab'
import { BudgetTab } from './tabs/BudgetTab'
import { ChecklistsTab } from './tabs/ChecklistsTab'

export interface PlannerShellProps {
  trip?: Trip | null
  children?: ReactNode
}

export function PlannerShell({ trip, children }: PlannerShellProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'itinerary'
  const setActiveTrip = useTripStore((s) => s.setActiveTrip)

  useEffect(() => {
    if (trip) setActiveTrip(trip)
  }, [trip, setActiveTrip])

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'overview', label: 'Overview', icon: Calendar },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'reservations', label: 'Bookings', icon: FileCheck },
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'checklists', label: 'Checklists', icon: CheckSquare },
  ]

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId })
  }

  const renderActiveTabContent = () => {
    if (children) return children
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />
      case 'explore':
        return <ExploreTab />
      case 'reservations':
        return <ReservationsTab />
      case 'budget':
        return <BudgetTab />
      case 'checklists':
        return <ChecklistsTab />
      case 'itinerary':
      default:
        return <ItineraryTab />
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] w-full bg-white text-left">
      {/* Left Panel: Header, Tabs, Content */}
      <div className="flex-1 lg:max-w-[55%] xl:max-w-[50%] flex flex-col border-r border-neutral-200/80">
        <PlannerHeader trip={trip} />

        {/* Planner Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto px-4 sm:px-6 pt-3 scrollbar-none border-b border-neutral-200/60">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-neutral-900 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">{renderActiveTabContent()}</div>
      </div>

      {/* Right Desktop Map Panel */}
      <div className="hidden lg:block lg:flex-1 h-[calc(100vh-4rem)] sticky top-16">
        <MapPanel className="h-full w-full" />
      </div>

      {/* Mobile Draggable Bottom Sheet Map (<1024px) */}
      <MobileMapSheet />
    </div>
  )
}
