import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface SelectProps {
  status: "paid" | "pending";
  setStatus: (status: "paid" | "pending") => void;
  value: "paid" | "pending";
}

export const CheckBox: React.FC<SelectProps> = ({
  status,
  setStatus,
  value,
}) => (
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

export const styles = StyleSheet.create({
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
