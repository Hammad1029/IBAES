import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

const initialState = {
  modules: [],
  teamScores: [],
  loading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    updateData: (state, action) => {
      state.modules = action.payload.modules || [];
      state.teamScores = action.payload.teamScores || [];
    },
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateData, setLoader } = appSlice.actions;

export default appSlice.reducer;
