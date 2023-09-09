import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth.slice";
import app from "./app.slice";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({ auth, app }));



const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;
