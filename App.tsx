import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseForm from './src/components/ExpenceForm';

interface Expense {
  id: string;
  description: string;
  amount: number;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    setSum(total);

    AsyncStorage.setItem('expenses', JSON.stringify(expenses));

  }, [expenses]);

  const loadExpenses = async () => {
    const data = await AsyncStorage.getItem('expenses');
    if (!data) return;

    const parsed = JSON.parse(data);
    setExpenses(parsed);
  };

  const addExpense = (description: string, amount: number) => {
    if (!description || !amount) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: amount,
    };

    setExpenses([newExpense, ...expenses]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>
      <ExpenseForm addExpense={addExpense} />

      <Text style={styles.sum}>Total: ₹{sum.toFixed(2)}</Text>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.description}: ₹{item.amount.toFixed(2)}</Text>
        )}
        style={{ width: '100%' }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sum: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  item: {
    fontSize: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
