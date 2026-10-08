export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  assignedTo?: string
  dueDate?: string
}

export interface Checklist {
  id: string
  tripId: string
  title: string
  category?: 'packing' | 'todos' | 'documents' | 'custom'
  items: ChecklistItem[]
}
