# 📱 CGP App - Control de Gastos Personales

Aplicación móvil desarrollada con React Native + Expo + Firebase, que permite a los usuarios autenticarse (Email / Google) y gestionar sus gastos personales con almacenamiento en Firestore.

## 🎯 Objetivo del proyecto

Desarrollar una app móvil funcional que permita:

- Autenticación de usuarios (Email / Google)
- Registro de gastos personales
- Clasificación por categoría
- Visualización de historial de gastos
- Cálculo de total mensual
- Persistencia en Firebase Firestore

## 🚀 Tecnologías utilizadas

- React Native (Expo)
- Expo Router
- Firebase Authentication
- Firebase Firestore
- Expo Auth Session (Google Login)
- TypeScript

## 🔐 Autenticación

La app implementa:

- Email & Password (Firebase Auth)
- Google Login (OAuth 2.0 con Expo Auth Session)

## ⚠️ Nota técnica importante

En Expo Go, el login con Google funciona mediante redirección web (exp://)
En producción se requiere build (EAS / APK / AAB) para flujo nativo completo

## 📦 Instalación y ejecución

```bash
npm install
npx expo start
```

Opciones:

- `a` → Android
- `w` → Web (mejor soporte OAuth actual)
- `npx expo start -c` → limpiar cache

## 📁 Estructura del proyecto

```
app/
├── (auth)/        # Login / Register
├── (tabs)/        # App principal (home, expenses, add)
├── _layout.tsx    # Router principal

components/         # UI reutilizable
hooks/              # lógica (auth, expenses)
lib/                # firebase + auth logic
constants/          # categorías de gastos
```

## 💰 Funcionalidades

### 🔑 Autenticación

- Login con correo y contraseña
- Login con Google (OAuth Firebase + Expo)

### 💸 Gestión de gastos

- Crear gasto
- Guardar en Firestore por usuario
- Ver historial
- Clasificación por categoría
- Fecha de registro

### 📊 Resumen

- Total mensual automático
- Filtrado por usuario autenticado

## 👥 Integrantes y responsabilidades

### 👨‍💻 Victor Velasco (Coordinador)

- Arquitectura del proyecto
- Integración Firebase (Auth + Firestore)
- Implementación Expo Router
- Lógica de autenticación (Email + Google)
- Hooks y estado global

### 🎥 Milton Ayala

Responsable de documentación audiovisual

- Grabación del video demo (máx. 15 min)
- Explicación del flujo:
  - Login
  - Registro de gastos
  - Visualización de datos
- Edición y entrega final del video

### 📄 José Aquino

Documentación técnica (PDF - APA 7ma edición)

- Portada e índice
- Investigación de Firebase Auth
- Explicación de implementación
- Capturas del sistema
- Conclusiones
- Formato APA obligatorio

### 🎨 William Montano

Diseño UI/UX de la aplicación

- Mejorar interfaz visual
- Consistencia de componentes
- UX del formulario de gastos
- Pantallas más limpias y modernas
- Optimización de experiencia de usuario

### ⚙️ Fernando Gomez

Mejoras funcionales de la app

- Validaciones de formularios
- Manejo de errores Firebase
- Mejoras en flujo de autenticación
- Optimización de Firestore queries
- Mejoras pequeñas de performance

## ⚠️ Notas importantes del proyecto

- Expo Go limita autenticación Google en modo nativo
- OAuth en desarrollo puede usar redirección exp://

En producción se recomienda:

- EAS Build
- Android APK o App Bundle

Firebase debe tener habilitado:

- Google Auth Provider
- Email/Password Provider
- Firestore Database

## 📌 Estado del proyecto

- ✔ Autenticación funcional
- ✔ Firebase conectado
- ✔ Gastos almacenados en Firestore
- ✔ Router por roles (auth / app)
- ⚠ Google Auth depende del entorno (Expo Go vs Web vs Build)

## 📄 Entregables

- Código fuente en GitHub
- Documento PDF (APA 7)
- Video demostrativo (≤ 15 min)
