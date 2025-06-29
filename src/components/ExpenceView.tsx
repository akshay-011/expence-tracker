import React from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { ListRenderItem } from "react-native";
import { Expense } from "../model/types";

interface ExpenceViewProps {
  expenses: Expense[];
  sum: number;
}

const ExpenceView: React.FC<ExpenceViewProps> = ({ expenses, sum }) => {
  const renderItem: ListRenderItem<Expense> = ({ item }) => (
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
