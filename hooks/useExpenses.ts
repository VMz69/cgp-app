import * as ExpensesService from "@/lib/expenses";
import { useEffect, useState } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  userId?: string;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ExpensesService.getExpenses();
      setExpenses(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error cargando gastos";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const newExpense = await ExpensesService.createExpense(expense);
      setExpenses([...expenses, newExpense]);
      return newExpense;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error creando gasto";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ExpensesService.deleteExpense(id);
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error eliminando gasto";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    deleteExpense,
  };
}
