// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/redux/reducers/userReducer'; // Asegúrate de tener el reducer correctamente configurado

// Crea el store con configureStore, que incluye thunk por defecto
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Define el tipo RootState basado en el store
export type RootState = ReturnType<typeof store.getState>;

// Define el tipo AppDispatch basado en el store
export type AppDispatch = typeof store.dispatch;
