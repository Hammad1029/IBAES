import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

const initialState = {
    isLoggedIn: false,
    user: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logoutUser: (state) => {
            deleteCookie('token');
            state.isLoggedIn = false;
        },
    },
});

export const { loginUser, logoutUser } =
    authSlice.actions;

export default authSlice.reducer;
