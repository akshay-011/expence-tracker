import { Expense } from "./types";

export type State = {
  expenses: Expense[];
  sum: number;
};

// TODO: fix this thing:
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
      type: "UPDATE_EXPENSE";
      payload: {
        id: string;
        description: string;
        amount: number;
        status: "paid" | "pending";
      };
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
    case "UPDATE_EXPENSE": {
      const expenses = state.expenses.map((exp) =>
        exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
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
