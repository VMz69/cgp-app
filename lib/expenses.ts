// lib/expenses.ts

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

/**
 * 🔹 Agregar gasto
 */
export const addExpense = async (
  name: string,
  amount: number,
  category: string,
  date: string,
) => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    await addDoc(collection(db, "expenses"), {
      name,
      amount,
      category,
      date,
      userId: user.uid,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * 🔹 Obtener gastos del usuario
 */
export const getExpenses = async () => {
  try {
    const user = auth.currentUser;

    if (!user) return [];

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
    );

    const querySnapshot = await getDocs(q);

    const expenses: any[] = [];

    querySnapshot.forEach((doc) => {
      expenses.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return expenses;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
