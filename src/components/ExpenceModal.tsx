import { Modal, Pressable, StyleSheet, View } from "react-native";
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
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <Pressable onPress={onClose} style={styles.overlay}>
        <View style={styles.popup}>
          <ExpenseForm expense={expense} addExpense={handleUpdate} />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(210, 206, 206, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default ExpenseModal;
