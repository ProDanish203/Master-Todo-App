// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/Auth";
import { todoReducer } from "./reducers/Todos";

const Store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer 
    }
})

export default Store;