import React from "react";
import { Modal, StyleSheet } from "react-native";
import { Expense } from "../model/types";
import ExpenseForm from "./ExpenceForm";

interface ExpenseModalProps {
  updateExpense: (
    description: string,
    amount: number,
    status: "paid" | "pending",
    id?: string
  ) => void;
  isVisible: boolean;
  onClose: () => void;
  expense: Expense;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  updateExpense,
  isVisible,
  onClose,
  expense,
}) => {
  const handleUpdate = (
    description: string,
    amount: number,
    status: "paid" | "pending",
    id?: string
  ) => {
    updateExpense(description, amount, status, id);
    onClose();
  };

  return (
    <Modal
      style={styles.modalContainer}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
    >
      <ExpenseForm expense={expense} addExpense={handleUpdate} />
    </Modal>
  );
};

export default ExpenseModal;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
