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
  userName: string;
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

// Acción asíncrona para el login
export const loginAsync = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest());

    try {
      // Simular una llamada API asíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validar credenciales
      if (username === 'usuario' && password === 'contraseña') {
        dispatch(
          loginSuccess({
            id: '1',
            username,
            email: 'usuario@example.com',
          })
        );
        return true;
      } else {
        dispatch(loginFailure('Credenciales inválidas'));
        return false;
      }
    } catch (error) {
      dispatch(loginFailure('Error en el servidor'));
      return false;
    }
  };
};
