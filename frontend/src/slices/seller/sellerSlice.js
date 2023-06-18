import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerService from "./sellerService";
import { toast } from "react-toastify";

//create initial state

const initialState = {
  seller: null,
  isSellerAuthenticated: false,
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
      toast.success("Login Success");
      return res.data.seller;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSeller = createAsyncThunk(
  "seller/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await sellerService.loadSellerService();
      return res.data.user;
    } catch (error) {
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
        state.isSellerAuthenticated = true;
        state.seller = action.payload;
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSellerAuthenticated = false;
        state.message = action.payload;
      })
      .addCase(getSeller.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSellerAuthenticated = true;
        state.message = "";
        state.seller = action.payload;
      })
      .addCase(getSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSellerAuthenticated = false;
        state.message = "";
        state.seller = null;
      });
  },
});

export const { reset } = sellerSlice.actions;
export default sellerSlice.reducer;
