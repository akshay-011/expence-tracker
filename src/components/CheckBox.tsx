import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./ExpenceForm";

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
