import React, { useEffect, useReducer } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExpenseForm from "./src/components/ExpenceForm";
import ExpenceView from "./src/components/ExpenceView";
import Header from "./src/components/Header";
import { stateReducer } from "./src/model/stateManager";
import { exportExpenses, importExpenses } from "./src/model/store";

const ExpenceAlert = () => {
  Alert.alert(
    "Expense Added!",
    "💸 Money flies! Was that really necessary? 😂",
    [{ text: "Oops!", style: "cancel" }]
  );
};

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, { expenses: [], sum: 0 });

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  const loadExpenses = async () => {
    const data = await importExpenses();
    dispatch({ type: "LOAD_EXPENSES", payload: data });
  };

  const addExpense = (
    description: string,
    amount: number,
    status: "paid" | "pending"
  ) => {
    dispatch({ type: "ADD_EXPENSE", payload: { description, amount, status } });
    ExpenceAlert();
  };

  const onStatusToggle = (id: string, newStatus: "paid" | "pending") => {
    dispatch({ type: "UPDATE_STATUS", payload: { id, status: newStatus } });
    exportExpenses(state.expenses);
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
