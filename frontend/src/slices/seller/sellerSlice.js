import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerService from "./sellerService";
import { toast } from "react-toastify";

//create initial state

const initialState = {
  seller: null,
  isAuthenticated: false,
  isLoading: null,
  isError: null,
  isSuccess: null,
  message: "",
};

//seller login thunk action creator
export const sellerLogin = createAsyncThunk(
  "seller/login",
  async (seller, thunkAPI) => {
    try {
      const res = await sellerService.sellerLoginService(seller);
      //   toast.success("Login Success");
      return res.data.seller;
    } catch (error) {
      //   toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

//create the seller slice

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    reset: (state) => {
      state.seller = null;
      state.isError = null;
      state.isLoading = null;
      state.message = "";
    },
  },

  //extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(sellerLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.seller = action.payload;
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = sellerSlice.actions;
export default sellerSlice.reducer;
