// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/Auth";

const Store = configureStore({
    reducer: {
        auth: authReducer, 
    }
})

export default Store;