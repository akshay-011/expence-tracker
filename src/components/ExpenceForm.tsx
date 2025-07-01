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
});

export default ExpenseForm;
