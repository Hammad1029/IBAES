import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth.slice";
import app from "./app.slice";

const store = configureStore({
    reducer: { auth, app },
});

export default store;