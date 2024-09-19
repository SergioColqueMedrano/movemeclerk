import { combineReducers, createStore } from "redux";

const initialState = {
    isSignedIn: true,
    userName: "Conan"
}

const rootReducer = combineReducers({
    userData : () => initialState
})

export const store = createStore(rootReducer)