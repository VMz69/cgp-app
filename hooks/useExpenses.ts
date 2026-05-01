import { useEffect, useState } from "react";
import type { Expense } from "../lib/expenses";
import * as ExpenseService from "../lib/expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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

  // Fernando — total general de todos los gastos registrados
  const getTotal = () =>
    expenses.reduce((acc, item) => acc + (item.amount || 0), 0);

  // Fernando — total filtrado al mes y año actual (fecha local para evitar desfase de timezone)
  const getMonthlyTotal = () => {
    const now = new Date();
    return expenses
      .filter((item) => {
        const [y, m] = item.date.split("T")[0].split("-").map(Number);
        const expenseDate = new Date(y, m - 1, 1);
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
    updateExpense: ExpenseService.updateExpense,
    deleteExpense: ExpenseService.deleteExpense,
    total: getTotal(),
    monthlyTotal: getMonthlyTotal(),
  };
};
