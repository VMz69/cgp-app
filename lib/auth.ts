// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from 'firebase/auth';
// import { auth } from './firebase';

interface User {
  id: string;
  email: string;
  name?: string;
}

// export async function login(email: string, password: string): Promise<User> {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return {
//     id: userCredential.user.uid,
//     email: userCredential.user.email || '',
//     name: userCredential.user.displayName || undefined,
//   };
// }

// export async function register(
//   email: string,
//   password: string,
//   name: string
// ): Promise<User> {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   return {
//     id: userCredential.user.uid,
//     email: userCredential.user.email || '',
//     name: name,
//   };
// }

// export async function logout(): Promise<void> {
//   await signOut(auth);
// }

// Mock functions para desarrollo
export async function login(email: string, password: string): Promise<User> {
  // Mock implementation
  console.log("Login:", email);
  return {
    id: "1",
    email: email,
    name: "Test User",
  };
}

export async function register(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  // Mock implementation
  console.log("Register:", email, name);
  return {
    id: "1",
    email: email,
    name: name,
  };
}

export async function logout(): Promise<void> {
  // Mock implementation
  console.log("Logout");
}
