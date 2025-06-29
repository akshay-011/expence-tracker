import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseForm from "./src/components/ExpenceForm";
import ExpenceView from "./src/components/ExpenceView";
import { Expense } from "./src/model/types";
import Header from "./src/components/Header";
import ExpenceManager from "./src/model/ExpenceManager";

const ExpenceAlert = () => {
  Alert.alert(
    "Expense Added!",
    "💸 Money flies! Was that really necessary? 😂",
    [{ text: "Oops!", style: "cancel" }]
  );
};

export default function App() {
  const [manager] = React.useState(() => new ExpenceManager([]));
  const [state, setState] = React.useState<{
    expenses: Expense[];
    sum: number;
  }>({ expenses: [], sum: 0 });

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  const loadExpenses = async () => {
    const data = await AsyncStorage.getItem("expenses");
    if (!data) return;
    const parsed: Expense[] = JSON.parse(data);
    manager.setExpenses(parsed);
    setState({ expenses: manager.getExpenses(), sum: manager.totalAmount() });
  };

  const addExpense = (
    description: string,
    amount: number,
    status: "paid" | "pending"
  ) => {
    manager.addExpense(description, amount, status);
    setState({ expenses: manager.getExpenses(), sum: manager.totalAmount() });
    ExpenceAlert();
  };

  const onStatusToggle = (id: string, newStatus: "paid" | "pending") => {
    manager.updateStatus(id, newStatus);
    setState({ expenses: manager.getExpenses(), sum: manager.totalAmount() });
    AsyncStorage.setItem("expenses", JSON.stringify(manager.getExpenses()));
  };

  return (
    <View style={styles.container}>
      <Header />
      <ExpenseForm addExpense={addExpense} />
      <ExpenceView
        sum={state.sum}
        expenses={state.expenses}
        onStatusToggle={onStatusToggle}
      />
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
