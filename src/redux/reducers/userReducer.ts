import { combineReducers } from 'redux';

// Acciones
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const SIGN_OUT = 'SIGN_OUT';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

// Estado inicial
const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userId: '',
  userData: {
    userName: '',
    email: '',
    gender: '',
    birthDate: '',
  },
};

// Reducer
export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,  // Establece el userId
        userData: {
          userName: action.payload.userName,
          email: action.payload.email,
          gender: action.payload.gender,
          birthDate: action.payload.birthDate,
        },
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        userId: '',
        userData: initialState.userData,  // Reinicia los datos del usuario
        loading: false,
        error: null,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,  // Actualiza los datos del usuario
        },
      };
    default:
      return state;
  }
};

// Root Reducer
export const rootReducer = combineReducers({
  user: userReducer,
});
