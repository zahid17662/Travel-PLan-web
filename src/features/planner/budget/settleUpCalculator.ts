import type { Expense, Member } from '@/types'

export interface Settlement {
  from: string
  to: string
  amount: number
}

export function computeSettlements(
  members: (Member | { id: string; name: string })[],
  expenses: Expense[]
): Settlement[] {
  // Calculate net balances
  const balances: Record<string, number> = {}
  members.forEach((m) => {
    balances[m.name] = 0
  })

  expenses.forEach((e) => {
    const splitCount = e.splitWith.length || 1
    const share = e.amount / splitCount

    // Add paid amount
    balances[e.paidBy] = (balances[e.paidBy] || 0) + e.amount

    // Subtract share for each member in split
    e.splitWith.forEach((person) => {
      balances[person] = (balances[person] || 0) - share
    })
  })

  // Debt minimization
  const debtors: { name: string; amount: number }[] = []
  const creditors: { name: string; amount: number }[] = []

  Object.entries(balances).forEach(([name, net]) => {
    const rounded = Math.round(net * 100) / 100
    if (rounded < -0.01) debtors.push({ name, amount: -rounded })
    else if (rounded > 0.01) creditors.push({ name, amount: rounded })
  })

  debtors.sort((a, b) => b.amount - a.amount)
  creditors.sort((a, b) => b.amount - a.amount)

  const settlements: Settlement[] = []
  let dIdx = 0
  let cIdx = 0

  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx]
    const creditor = creditors[cIdx]
    const pay = Math.min(debtor.amount, creditor.amount)

    if (pay > 0.01) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(pay * 100) / 100,
      })
    }

    debtor.amount -= pay
    creditor.amount -= pay

    if (debtor.amount < 0.01) dIdx++
    if (creditor.amount < 0.01) cIdx++
  }

  return settlements
}
