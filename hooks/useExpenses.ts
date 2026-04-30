import { useEffect, useState } from "react";
import * as ExpenseService from "../lib/expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  const loadExpenses = async () => {
    try {
      const data = await ExpenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      // 🔹 evita que la app reviente si algo falla
      setExpenses([]);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  /**
   * 🔹 Total simple
   */
  const getTotal = () => {
    return expenses.reduce((acc, item) => acc + (item.amount || 0), 0);
  };

  return {
    expenses,
    loadExpenses,
    addExpense: ExpenseService.addExpense,
    total: getTotal(),
  };
};
