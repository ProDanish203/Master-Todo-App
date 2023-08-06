// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

const TodoReducer = createSlice({
    name: "Todo",
    initialState: {
        todos: [],
    },
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
        }
    }
})


export const { setTodos }  = TodoReducer.actions;
export const todoReducer = TodoReducer.reducer;