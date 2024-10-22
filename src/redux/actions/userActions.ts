// src/redux/actions/userActions.ts
import { Dispatch } from 'redux';

// Definimos las constantes de acción
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const SET_USER_ID = 'SET_USER_ID';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Interfaz para el tipo de datos del usuario
interface UserData {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  userId: string;
}

// Interfaz para el tipo de datos del usuario autenticado
interface AuthUserData {
  id: string;
  username: string;
  email: string;
}

// Acción síncrona para signIn
export const signIn = (userData: UserData) => ({
  type: SIGN_IN,
  payload: userData,
});

// Acción síncrona para signOut
export const signOut = () => ({
  type: SIGN_OUT,
});

// Acción síncrona para actualizar los datos del usuario
export const updateUserData = (newUserData: Partial<UserData>) => ({
  type: UPDATE_USER_DATA,
  payload: newUserData,
});

// Acción síncrona para actualizar el userId
export const setUserId = (userId: string) => ({
  type: SET_USER_ID,
  payload: userId,
});

// Acciones relacionadas con la autenticación
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user: AuthUserData) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Acción asíncrona para el login real
export const loginAsync = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());

    try {
      // Realiza una llamada al servidor para autenticar
      const response = await fetch('https://5h8llgsm-3000.brs.devtunnels.ms/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,   // Envío de email y password al servidor
          password,
        }),
      });

      // Verifica si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json(); // Procesa los datos de la respuesta
        dispatch(loginSuccess(data)); // Llama a la acción de éxito con los datos recibidos
        return true;
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message || 'Credenciales inválidas'));
        return false;
      }
    } catch (error) {
      dispatch(loginFailure('Error en el servidor'));
      return false;
    }
  };
};
