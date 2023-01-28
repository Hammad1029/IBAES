import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

const initialState = {
    modules: [],
    teamScores: []
};

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        updateData: (state, action) => {
            state.modules = action.payload.modules;
            state.teamScores = action.payload.teamScores;
        },
    },
});

export const { updateData } = appSlice.actions;

export default appSlice.reducer;
