import React, { useState } from "react";
import Input from "../common/Input";
import { Button } from "react-native";

interface ExpenseFormProps {
  addExpense: (description: string, amount: number) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const onPressHandler = () => {
    addExpense(description, parseFloat(amount));
    setDescription("");
    setAmount("");
  };

  return (
    <>
      <Input
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Input
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Button title="Add Expense" onPress={onPressHandler} />
    </>
  );
};

export default ExpenseForm;
