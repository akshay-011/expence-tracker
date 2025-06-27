import React from "react";
import { StyleSheet, Text } from "react-native";

const Header = () => <Text style={styles.header}>Expense Tracker</Text>;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Header;
