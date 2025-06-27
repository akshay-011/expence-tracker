import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { ListRenderItem } from "react-native";
import { Expense } from "../model/types";

interface ExpenceViewProps {
  expenses: Expense[];
  sum: number;
}

const renderItem: ListRenderItem<Expense> = ({ item }) => (
  <Text style={styles.item}>
    {item.description}: ₹{item.amount.toFixed(2)} (
    {new Date(item.date).toLocaleDateString()})
  </Text>
);

const ExpenceView: React.FC<ExpenceViewProps> = ({ expenses, sum }) => {
  return (
    <>
      <Text style={styles.sum}>Total: ₹{sum.toFixed(2)}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sum: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  item: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default ExpenceView;
