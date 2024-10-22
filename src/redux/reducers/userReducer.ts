import { combineReducers } from 'redux';

// Acciones
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const SIGN_OUT = 'SIGN_OUT';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

// Tipo del estado de usuario
interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userId: string;
  userData: {
    name: string;
    email: string;
    gender: string;
    birthDate: string;
  };
}

// Estado inicial tipificado
const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userId: '',
  userData: {
    name: '',
    email: '',
    gender: '',
    birthDate: '',
  },
};

// Reducer de usuario
export const userReducer = (state = initialState, action: any): UserState => {
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
        userId: action.payload.userId || '',
        userData: {
          name: action.payload.name || '',
          email: action.payload.email || '',
          gender: action.payload.gender || '',
          birthDate: action.payload.birthDate || '',
        },
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload.error || 'Error desconocido',
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        userId: '',
        userData: initialState.userData,
        loading: false,
        error: null,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

// Root Reducer (si tienes más reducers)
export const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
