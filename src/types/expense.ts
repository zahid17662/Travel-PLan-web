export interface Expense {
  id: string
  tripId: string
  title: string
  amount: number
  currency: string
  category: 'food' | 'transport' | 'lodging' | 'entertainment' | 'shopping' | 'other'
  paidBy: string
  splitWith: string[]
  date: string
  receiptUrl?: string
}
