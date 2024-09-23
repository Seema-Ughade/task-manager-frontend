import { configureStore } from "@reduxjs/toolkit";

// Importing Reducers
import userReducer from "./reducers/userReducer";

// PRODUCTION
export const server = "http://127.0.0.1:5000/api/v1";

// DEVELOPMENT
// export const server = "http://localhost:2000/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
