import type { Trip, Expense } from '@/types'

export function addExpenseToTrip(trip: Trip, expense: Omit<Expense, 'id' | 'tripId'>): Trip {
  const newExpense: Expense = {
    ...expense,
    id: `exp-${Date.now().toString(36)}`,
    tripId: trip.id,
  }
  const expenses = [...(trip.expenses || []), newExpense]
  const budgetSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  return { ...trip, expenses, budgetSpent }
}

export function deleteExpenseFromTrip(trip: Trip, expenseId: string): Trip {
  const expenses = (trip.expenses || []).filter((e) => e.id !== expenseId)
  const budgetSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  return { ...trip, expenses, budgetSpent }
}

export function updateBudgetTotalInTrip(trip: Trip, budgetTotal: number): Trip {
  return { ...trip, budgetTotal }
}
