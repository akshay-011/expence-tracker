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

interface FormState {
  description: string;
  amount: number;
  status: "paid" | "pending";
}

const isStateValid = (state: FormState): boolean => {
  return (
    state.description.trim() !== "" &&
    !isNaN(state.amount) &&
    state.amount > 0 &&
    (state.status === "paid" || state.status === "pending")
  );
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [formState, setFormState] = useState<FormState>({
    description: "",
    amount: 0,
    status: "pending",
  });

  const onChangeText = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  const onPressHandler = () => {
    addExpense(formState.description, formState.amount, formState.status);
    setFormState({
      description: "",
      amount: 0,
      status: "pending",
    });
  };

  return (
    <>
      <Input
        placeholder="Description"
        value={formState.description}
        onChangeText={onChangeText}
        name="description"
      />
      <Input
        value={formState.amount.toString()}
        onChangeText={onChangeText}
        name="amount"
        keyboardType="numeric"
      />
      <View style={styles.statusRow}>
        <CheckBox
          status={formState.status}
          name="status"
          setStatus={onChangeText}
          value="paid"
        />
        <CheckBox
          status={formState.status}
          name="status"
          setStatus={onChangeText}
          value="pending"
        />
      </View>
      <Button
        disabled={!isStateValid(formState)}
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
