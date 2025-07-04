import { Expense } from "./types";

export type State = {
  expenses: Expense[];
  sum: number;
};

export type Action =
  | { type: "LOAD_EXPENSES"; payload: Expense[] }
  | {
      type: "ADD_EXPENSE";
      payload: {
        description: string;
        amount: number;
        status: "paid" | "pending";
      };
    }
  | {
      type: "UPDATE_STATUS";
      payload: { id: string; status: "paid" | "pending" };
    };

export function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_EXPENSES": {
      const sum = action.payload.reduce((acc, curr) => acc + curr.amount, 0);
      return { expenses: action.payload, sum };
    }

    case "ADD_EXPENSE": {
      const newExpense: Expense = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        description: action.payload.description,
        amount: action.payload.amount,
        status: action.payload.status,
      };

      const expenses = [newExpense, ...state.expenses];
      const sum = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      return { expenses, sum };
    }
    case "UPDATE_STATUS": {
      const expenses = state.expenses.map((exp) =>
        exp.id === action.payload.id
          ? { ...exp, status: action.payload.status }
          : exp
      );

      return {
        expenses,
        sum: expenses.reduce((acc, curr) => acc + curr.amount, 0),
      };
    }
    default:
      return state;
  }
}
