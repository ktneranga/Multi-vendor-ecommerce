import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user/userSlice";
import sellerReducer from "../slices/seller/sellerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
  },
});
