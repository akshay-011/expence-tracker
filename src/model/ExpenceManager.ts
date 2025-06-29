import { Expense } from "./types";

export default class ExpenceManager {
  private expenses: Expense[] = [];

  constructor(initialExpenses: Expense[] = []) {
    this.expenses = initialExpenses;
  }

  addExpense(
    description: string,
    amount: number,
    status: "paid" | "pending" = "pending"
  ): void {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      description,
      amount,
      status,
    };

    this.expenses = [newExpense, ...this.expenses];
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  setExpenses(expenses: Expense[]): void {
    this.expenses = expenses;
  }

  totalAmount(): number {
    return this.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }

  updateStatus(id: string, status: "paid" | "pending"): void {
    this.expenses = this.expenses.map((exp) =>
      exp.id === id ? { ...exp, status } : exp
    );
  }
}
