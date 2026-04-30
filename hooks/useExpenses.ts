// hooks/useExpenses.ts

import { useEffect, useState } from "react";
import * as ExpenseService from "../lib/expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  const loadExpenses = async () => {
    const data = await ExpenseService.getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  /**
   * 🔹 Total mensual (simple)
   */
  const getTotal = () => {
    return expenses.reduce((acc, item) => acc + item.amount, 0);
  };

  return {
    expenses,
    loadExpenses,
    addExpense: ExpenseService.addExpense,
    total: getTotal(),
  };
};
