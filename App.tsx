import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseForm from "./src/components/ExpenceForm";
import ExpenceView from "./src/components/ExpenceView";
import ExpenceManager from "./src/model/ExpenceManager";
import { Expense } from "./src/model/types";
import Header from "./src/components/Header";

const ExpenceAlert = () => {
  Alert.alert(
    "Expense Added!",
    "💸 Money flies! Was that really necessary? 😂",
    [{ text: "Oops!", style: "cancel" }]
  );
};

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sum, setSum] = useState(0);
  const [manager, setManager] = useState<ExpenceManager | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    setSum(manager?.totalAmount() || 0);
    AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const loadExpenses = async () => {
    const data = await AsyncStorage.getItem("expenses");
    if (!data) return;

    const parsed: Expense[] = JSON.parse(data);
    const mngr = new ExpenceManager(parsed);

    setManager(mngr);
    setExpenses(mngr.getExpenses());
  };

  const addExpense = (
    description: string,
    amount: number,
    status: "paid" | "pending"
  ) => {
    if (!manager) return;

    if (!description.trim() || isNaN(amount) || amount <= 0) {
      Alert.alert(
        "Invalid input",
        "Please enter a valid description and amount."
      );
      return;
    }
    manager.addExpense(description, amount, status);
    setExpenses([...manager.getExpenses()]);
    ExpenceAlert();
  };

  return (
    <View style={styles.container}>
      <Header />
      <ExpenseForm addExpense={addExpense} />
      <ExpenceView sum={sum} expenses={expenses} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sum: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
