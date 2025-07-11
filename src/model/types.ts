export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
}
