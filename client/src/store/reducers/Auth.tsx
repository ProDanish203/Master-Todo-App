// @ts-ignore
import { createSlice } from "@reduxjs/toolkit";

const AuthReducer = createSlice({
    name: "Auth",
    initialState: {
        user: null,
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state) => {
            state.loading = !state.loading
        }
    }
})


export const { setUser, setLoading }  = AuthReducer.actions;
export const authReducer = AuthReducer.reducer;