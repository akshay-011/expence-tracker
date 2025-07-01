import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense } from "./types";

export const exportExpenses = async (expenses: Expense[]) => {
  try {
    await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  } catch (error) {
    console.error("Failed to save expenses:", error);
  }
};

export const importExpenses = async (): Promise<Expense[]> => {
  const data = (await AsyncStorage.getItem("expenses")) || "[]";
  return JSON.parse(data) as Expense[];
};
