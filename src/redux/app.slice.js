import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

const initialState = {
    modules: [],
    teamScores: [],
    userBalance: [],
    stocks: [],
    headlines: []
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        updateData: (state, action) => {
            state.modules = action.payload.modules || [];
            state.teamScores = action.payload.teamScores || [];
            state.userBalance = action.payload.userBalance || [];
            state.stocks = action.payload.stocks || [];
            state.headlines = action.payload.headlines || [];
        },
    },
});

export const { updateData } = appSlice.actions;

export default appSlice.reducer;
