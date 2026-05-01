import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Fernando — tipo base para un gasto de la colección expenses
export type Expense = {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
  createdAt: any;
};

// Fernando — agregar un nuevo gasto a Firestore
export const addExpense = async (
  name: string,
  amount: number,
  category: string,
  date: string,
) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");
    if (!name || amount <= 0) throw new Error("Datos inválidos");

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

// Fernando — obtener todos los gastos del usuario autenticado
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(
      collection(db, "expenses"),
      where("userId", "==", user.uid),
    );

    const querySnapshot = await getDocs(q);
    const expenses: Expense[] = [];

    querySnapshot.forEach((docSnap) => {
      expenses.push({ id: docSnap.id, ...docSnap.data() } as Expense);
    });

    return expenses;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fernando — obtener un gasto por su ID de documento
export const getExpenseById = async (id: string): Promise<Expense | null> => {
  try {
    const docRef = doc(db, "expenses", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Expense;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fernando — actualizar campos de un gasto existente en Firestore
export const updateExpense = async (
  id: string,
  data: Partial<Pick<Expense, "name" | "amount" | "category" | "date">>,
) => {
  try {
    const docRef = doc(db, "expenses", id);
    await updateDoc(docRef, { ...data });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fernando — eliminar un gasto de Firestore por su ID
export const deleteExpense = async (id: string) => {
  try {
    const docRef = doc(db, "expenses", id);
    await deleteDoc(docRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
