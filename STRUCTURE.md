# Estructura de Carpetas - CGP App

## Descripción General

Esta es una aplicación móvil de gestión de gastos personales construida con Expo Router y React Native.

## Estructura del Proyecto

```
cgp-app/
│
├── app/
│   ├── _layout.tsx
│
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # resumen mensual
│   │   ├── expenses.tsx     # historial
│   │   └── add.tsx          # agregar gasto
│
├── components/
│   ├── FormInput.tsx
│   ├── ExpenseItem.tsx
│   └── Button.tsx
│
├── hooks/
│   ├── useAuth.ts
│   └── useExpenses.ts
│
├── lib/
│   ├── firebase.ts
│   ├── auth.ts
│   ├── expenses.ts
│   └── googleAuth.ts
│
├── constants/
│   └── categories.ts
│
├── assets/
│
├── app.json
├── tsconfig.json
├── package.json
└── README.md
```

## Descripción de Responsabilidades

### Carpeta `app/`

- **Root Layout**: Controla la navegación condicional basada en autenticación.
- **Auth Group**: Maneja login/register para usuarios no autenticados.
- **Tabs Group**: Pantallas principales de la app (solo usuarios autenticados).

### Carpeta `components/`

- Componentes reutilizables de UI.
- Enfoque en presentación y props.

### Carpeta `hooks/`

- Lógica puente entre componentes y servicios.
- `useAuth`: Maneja estado de autenticación.
- `useExpenses`: Maneja estado y operaciones de gastos.

### Carpeta `lib/`

- Contiene la configuración Firebase y servicios de backend.
- `firebase.ts`: inicializa Firebase Auth y Firestore.
- `auth.ts`: login, registro y logout con Firebase.
- `expenses.ts`: operaciones de gasto en Firestore.
- `googleAuth.ts`: configuración de Expo Auth Session para Google.

## Pantallas Principales

### 1. Pantalla de Login (`app/(auth)/login.tsx`)

- Formulario de ingreso.
- Login con email y contraseña.
- Botón para iniciar sesión con Google (requires review para integración completa).

### 2. Pantalla de Registro (`app/(auth)/register.tsx`)

- Formulario de nuevo usuario.
- Registro y login inmediato luego de crear la cuenta.

### 3. Home/Resumen (`app/(tabs)/index.tsx`)

- Resumen mensual de gastos.
- Total mensual.
- Total general.
- Botón de cerrar sesión.

### 4. Historial de Gastos (`app/(tabs)/expenses.tsx`)

- Lista completa de gastos.
- Botón para recargar gastos.
- No incluye aún filtros o eliminación.

### 5. Agregar Gasto (`app/(tabs)/add.tsx`)

- Formulario para nuevo gasto.
- Selección de categoría.
- Validaciones de campos.

## Categorías de Gastos (`constants/categories.ts`)

Disponibles:

- 🍽️ Comida
- 🚗 Transporte
- 🛍️ Compras
- 🎬 Entretenimiento
- 💡 Servicios
- ⚕️ Salud
- 📚 Educación
- 📦 Otros

## Scripts Disponibles

- `npm start`          # Inicia servidor de desarrollo
- `npm run android`    # Ejecuta en Android
- `npm run ios`        # Ejecuta en iOS
- `npm run web`        # Ejecuta en Web
- `npm run lint`       # Ejecuta ESLint
- `npm run reset-project` # Resetea el proyecto usando script local

## Dependencias Principales

- `expo-router`
- `react-navigation`
- `react-native`
- `expo`
- `firebase`

## Notas Importantes

1. **Authentication Flow**: El archivo `app/_layout.tsx` maneja el flujo condicional.
2. **Type Safety**: El proyecto usa TypeScript.
3. **Imports**: Se usa alias `@/*` en `tsconfig.json`.
4. **Componentes Reutilizables**: Están en `components/`.

## Estado actual de la implementación

- Autenticación por email funcional.
- Firestore conectado.
- Gastos guardados y listados.
- Google Sign-In presente como flujo de OAuth, pero puede requerir revisión adicional para completarse en Firebase y en Expo Go.

## Próximos pasos

- Agregar eliminación de gastos.
- Añadir búsqueda y filtros en historial.
- Revisar el flujo de Google login para integrar completamente con Firebase Auth.
