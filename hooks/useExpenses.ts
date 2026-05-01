import { useEffect, useState } from "react";
import * as ExpenseService from "../lib/expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  const loadExpenses = async () => {
    try {
      const data = await ExpenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      setExpenses([]);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  /**
   * 🔹 Total general (todos los gastos)
   */
  const getTotal = () => {
    return expenses.reduce((acc, item) => acc + (item.amount || 0), 0);
  };

  /**
   * Total del mes actual
   */
  const getMonthlyTotal = () => {
    const now = new Date();

    return expenses
      .filter((item) => {
        // 🔹 convertir fecha guardada a Date
        const expenseDate = new Date(item.date);

        // 🔹 comparar mes y año
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce((acc, item) => acc + (item.amount || 0), 0);
  };

  return {
    expenses,
    loadExpenses,
    addExpense: ExpenseService.addExpense,
    total: getTotal(),
    monthlyTotal: getMonthlyTotal(),
  };
};
