# Estructura de Carpetas - CGP App

## Descripción General
Esta es una aplicación móvil de gestión de gastos personales construida con Expo Router y React Native.

## Estructura del Proyecto

```
cgp-app/
│
├── app/                          # Rutas (Expo Router)
│   ├── _layout.tsx               # Root layout con control de auth
│
│   ├── (auth)/                   # Grupo autenticación
│   │   ├── _layout.tsx           # Layout de auth
│   │   ├── login.tsx             # Pantalla de login
│   │   └── register.tsx          # Pantalla de registro
│
│   ├── (tabs)/                   # App principal con navegación por tabs
│   │   ├── _layout.tsx           # Configuración de tabs
│   │   ├── index.tsx             # Home / Resumen mensual
│   │   ├── expenses.tsx          # Historial de gastos
│   │   ├── add.tsx               # Agregar nuevo gasto
│   │   └── explore.tsx           # (Componente opcional existente)
│
│   └── modal.tsx                 # (Componente modal opcional)
│
├── components/                   # Componentes reutilizables
│   ├── FormInput.tsx             # Input de formulario
│   ├── ExpenseItem.tsx           # Item de gasto
│   ├── Button.tsx                # Botón personalizado
│   └── ui/                       # Componentes de UI (theme)
│
├── hooks/                        # Hooks personalizados (lógica de negocio)
│   ├── useAuth.ts                # Lógica de autenticación
│   └── useExpenses.ts            # Lógica de gastos (CRUD)
│
├── lib/                          # Firebase y servicios (NO TOCAR SIN INDICACIÓN)
│   ├── firebase.ts               # Configuración de Firebase
│   ├── auth.ts                   # Funciones de login/register/logout
│   └── expenses.ts               # Funciones CRUD de gastos
│
├── constants/                    # Datos estáticos y configuraciones
│   ├── categories.ts             # Categorías de gastos
│   └── theme.ts                  # Configuración de tema
│
├── assets/                       # Imágenes y recursos
│   └── images/                   # Imágenes del proyecto
│
├── hooks/
│   ├── use-color-scheme.ts       # Hook para tema claro/oscuro
│   ├── use-theme-color.ts        # Hook para colores de tema
│   └── useAuth.ts                # Hook de autenticación (TÚ)
│   └── useExpenses.ts            # Hook de gastos (TÚ)
│
├── app.json                      # Configuración de Expo
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias del proyecto
└── README.md                     # Documentación del proyecto
```

## Descripción de Responsabilidades

### Carpeta `app/`
- **Root Layout**: Controla la navegación condicional basada en autenticación
- **Auth Group**: Maneja login/register para usuarios no autenticados
- **Tabs Group**: Pantallas principales de la app (solo usuarios autenticados)

### Carpeta `components/`
- **Componentes reutilizables** del equipo
- Enfoque en UI y presentación
- Reciben datos como props

### Carpeta `hooks/`
- **TÚ**: Aquí va la lógica puente entre componentes y servicios
- `useAuth`: Maneja estado de autenticación
- `useExpenses`: Maneja estado y operaciones de gastos

### Carpeta `lib/`
- **INTOCABLE sin indicación específica** (contiene Firebase)
- Funciones básicas de autenticación y CRUD
- Comunicación con backend

## Pantallas Principales

### 1. Pantalla de Login (`app/(auth)/login.tsx`)
- Formulario de ingreso
- Usa `useAuth()` para login

### 2. Pantalla de Registro (`app/(auth)/register.tsx`)
- Formulario de nuevo usuario
- Usa `useAuth()` para registro

### 3. Home/Resumen (`app/(tabs)/index.tsx`)
- Resumen mensual de gastos
- Estadísticas rápidas
- Últimas transacciones

### 4. Historial de Gastos (`app/(tabs)/expenses.tsx`)
- Lista completa de gastos
- Filtrado y búsqueda (TODO)
- Eliminación de gastos (TODO)

### 5. Agregar Gasto (`app/(tabs)/add.tsx`)
- Formulario para nuevo gasto
- Selección de categoría
- Validaciones

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

## Próximos Pasos

### TODO - Equipo (Componentes)
- [ ] Mejorar diseño del formulario
- [ ] Agregar validaciones en FormInput
- [ ] Crear componentes de filtro

### TODO - TÚ (Hooks & Lógica)
- [ ] Completar lógica de login
- [ ] Implementar validaciones en useAuth
- [ ] Agregar funcionalidad de filtrar gastos en useExpenses
- [ ] Agregar paginación en gastos

### TODO - Firebase (Si aplica)
- [ ] Conectar a Firebase real
- [ ] Implementar seguridad en Firestore
- [ ] Agregar autenticación con Google (opcional)

## Scripts Disponibles

```bash
npm start          # Inicia servidor de desarrollo
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS
npm run web        # Ejecuta en web
npm run lint       # Ejecuta ESLint
```

## Dependencias Principales

- **expo-router**: Navegación y rutas
- **react-navigation**: Navegación de tabs
- **react-native**: Framework base
- **expo**: Plataforma Expo

## Notas Importantes

1. **Authentication Flow**: El archivo `app/_layout.tsx` maneja el flujo condicional
2. **Type Safety**: Todos los archivos son TypeScript (.ts/.tsx)
3. **Imports**: Usar alias `@/` para imports (configurado en `tsconfig.json`)
4. **Componentes Reutilizables**: Están en `components/`, no duplicar código
