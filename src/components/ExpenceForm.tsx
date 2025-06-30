import React, { useState } from "react";
import Input from "../common/Input";
import { Button, View, StyleSheet } from "react-native";
import { CheckBox } from "./CheckBox";

interface ExpenseFormProps {
  addExpense: (
    description: string,
    amount: number,
    status: "paid" | "pending"
  ) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<"paid" | "pending">("pending");

  const onPressHandler = () => {
    addExpense(description, amount, status);
    setDescription("");
    setAmount(0);
    setStatus("pending");
  };

  return (
    <>
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Input
        value={amount.toString()}
        onChangeText={(text) => setAmount(parseFloat(text) || 0)}
        keyboardType="numeric"
      />
      <View style={styles.statusRow}>
        <CheckBox status={status} setStatus={setStatus} value="paid" />

        <CheckBox status={status} setStatus={setStatus} value="pending" />
      </View>
      <Button
        disabled={!description.trim() || isNaN(amount) || amount <= 0}
        title="Add Expense"
        onPress={onPressHandler}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  statusRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  checkedPaid: {
    borderColor: "green",
    backgroundColor: "#eaffea",
  },
  checkedPending: {
    borderColor: "red",
    backgroundColor: "#ffeaea",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  checkboxText: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 2,
    alignSelf: "center",
  },
});

export default ExpenseForm;
