import React, { useState } from "react";
import { StyleSheet, Text, FlatList, View, Pressable } from "react-native";
import { ListRenderItem } from "react-native";
import { Expense } from "../model/types";
import ExpenseModal from "./ExpenceModal";

interface ExpenceViewProps {
  expenses: Expense[];
  sum: number;
  updateExpense: (
    description: string,
    amount: number,
    status: "paid" | "pending",
    id?: string
  ) => void;
}

const ExpenceView: React.FC<ExpenceViewProps> = ({
  expenses,
  sum,
  updateExpense,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handlePress = (item: Expense) => {
    setSelectedExpense(item);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedExpense(null);
  };

  const renderItem: ListRenderItem<Expense> = ({ item }) => (
    <Pressable onPress={() => handlePress(item)}>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>
          {item.description}: ₹{item.amount.toFixed(2)} (
          {new Date(item.date).toLocaleDateString()})
        </Text>
        <Text
          style={
            item.status === "paid" ? styles.statusPaid : styles.statusPending
          }
        >
          {item.status.toLocaleLowerCase()}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <Text style={styles.sum}>Total: ₹{sum.toFixed(2)}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
      {selectedExpense && (
        <ExpenseModal
          expense={selectedExpense}
          isVisible={modalVisible}
          onClose={handleClose}
          updateExpense={updateExpense}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sum: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  statusPaid: {
    color: "green",
    fontWeight: "bold",
    marginLeft: 10,
  },
  statusPending: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ExpenceView;
