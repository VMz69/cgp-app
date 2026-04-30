// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   query,
//   where,
//   Timestamp,
// } from 'firebase/firestore';
// import { firestore, auth } from './firebase';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  userId?: string;
}

// export async function getExpenses(): Promise<Expense[]> {
//   const user = auth.currentUser;
//   if (!user) throw new Error('User not authenticated');

//   const q = query(
//     collection(firestore, 'expenses'),
//     where('userId', '==', user.uid)
//   );
//   const snapshot = await getDocs(q);
//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   } as Expense));
// }

// export async function createExpense(
//   expense: Omit<Expense, 'id'>
// ): Promise<Expense> {
//   const user = auth.currentUser;
//   if (!user) throw new Error('User not authenticated');

//   const docRef = await addDoc(collection(firestore, 'expenses'), {
//     ...expense,
//     userId: user.uid,
//     createdAt: Timestamp.now(),
//   });

//   return {
//     id: docRef.id,
//     ...expense,
//   };
// }

// export async function deleteExpense(id: string): Promise<void> {
//   const user = auth.currentUser;
//   if (!user) throw new Error('User not authenticated');

//   await deleteDoc(doc(firestore, 'expenses', id));
// }

// Mock functions para desarrollo
export async function getExpenses(): Promise<Expense[]> {
  // Mock implementation
  console.log("Getting expenses");
  return [
    {
      id: "1",
      description: "Café",
      amount: 5.0,
      category: "Comida",
      date: "2024-01-15",
    },
    {
      id: "2",
      description: "Gasolina",
      amount: 45.0,
      category: "Transporte",
      date: "2024-01-14",
    },
  ];
}

export async function createExpense(
  expense: Omit<Expense, "id">,
): Promise<Expense> {
  // Mock implementation
  console.log("Creating expense:", expense);
  return {
    id: Date.now().toString(),
    ...expense,
  };
}

export async function deleteExpense(id: string): Promise<void> {
  // Mock implementation
  console.log("Deleting expense:", id);
}
