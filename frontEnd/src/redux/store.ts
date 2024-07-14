// configureStore.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { likeReducer } from "./likesReducer";
import { vacationReducer } from "./vacationReducer";
import { UserReducer } from "./usersReducer";

// Combine all your reducers
const rootReducer = combineReducers({
  users: UserReducer,
  vacations: vacationReducer,
  likes: likeReducer,
});

// Configuration for Redux-persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
