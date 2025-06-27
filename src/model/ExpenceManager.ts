import { Expense } from "./types";

export default class ExpenceManager {
  private expenses: Expense[] = [];

  constructor(initialExpenses: Expense[] = []) {
    this.expenses = initialExpenses;
  }

  addExpense(description: string, amount: number): void {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      description,
      amount,
    };

    this.expenses = [newExpense, ...this.expenses];
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  totalAmount(): number {
    return this.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }
}
