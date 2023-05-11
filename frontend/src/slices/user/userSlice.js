import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: null,
  isError: null,
  isSuccess: null,
  message: "",
};

export const getUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
  try {
    const res = await userService.getUser();
    return res.data.user;
  } catch (error) {
    toast.error(error.response.data);
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = null;
      state.isError = null;
      state.isSuccess = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
