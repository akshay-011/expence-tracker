import React, { useState } from "react";
import Input from "../common/Input";
import { Button, View, Text, StyleSheet } from "react-native";

interface ExpenseFormProps {
  addExpense: (
    description: string,
    amount: number,
    status: "paid" | "pending"
  ) => void;
}

interface SelectProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: object;
}

const Select: React.FC<SelectProps> = ({ onPress, children, style }) => (
  <Text onPress={onPress} style={{ ...styles.statusOption, ...style }}>
    {children}
  </Text>
);

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"paid" | "pending">("pending");

  const onPressHandler = () => {
    addExpense(description, parseFloat(amount), status);
    setDescription("");
    setAmount("");
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
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <View style={styles.statusRow}>
        <Select style={styles.selectedPaid} onPress={() => setStatus("paid")}>
          Paid
        </Select>

        <Select
          style={styles.selectedPending}
          onPress={() => setStatus("pending")}
        >
          Pending
        </Select>
      </View>
      <Button title="Add Expense" onPress={onPressHandler} />
    </>
  );
};

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  statusOption: {
    fontSize: 16,
    marginHorizontal: 10,
    padding: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#333",
    backgroundColor: "#f5f5f5",
  },
  selectedPaid: {
    color: "green",
    borderColor: "green",
    fontWeight: "bold",
    backgroundColor: "#eaffea",
  },
  selectedPending: {
    color: "red",
    borderColor: "red",
    fontWeight: "bold",
    backgroundColor: "#ffeaea",
  },
});

export default ExpenseForm;
