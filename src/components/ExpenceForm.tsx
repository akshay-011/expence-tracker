import React, { useState } from "react";
import Input from "../common/Input";
import { Button, View, Text, StyleSheet, Pressable } from "react-native";

interface ExpenseFormProps {
  addExpense: (
    description: string,
    amount: number,
    status: "paid" | "pending"
  ) => void;
}

interface SelectProps {
  status: "paid" | "pending";
  setStatus: (status: "paid" | "pending") => void;
  value: "paid" | "pending";
}

const CheckBox: React.FC<SelectProps> = ({ status, setStatus, value }) => (
  <>
    <Pressable
      style={[
        styles.checkbox,
        status === value ? styles.checkedPaid : styles.checkedPending,
      ]}
      onPress={() => setStatus(value)}
    >
      <Text style={styles.checkboxLabel}>{status === value ? "✔" : ""}</Text>
    </Pressable>
    <Text style={styles.checkboxText}>{value}</Text>
  </>
);

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
        placeholder="Amount"
        value={amount.toString()}
        onChangeText={(text) => setAmount(parseFloat(text))}
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

const styles = StyleSheet.create({
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
