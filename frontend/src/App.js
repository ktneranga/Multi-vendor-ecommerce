import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingsPage,
  EventsPage,
  FaqPage,
} from "./Routes";
import "./App.css";
import axios from "axios";
import { server } from "./server";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./slices/user/userSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const { isLoading } = useSelector((state) => state.user);

  console.log("loading", isLoading);

  return (
    <>
      {isLoading ? null : (
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/activation/:token" element={<ActivationPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
