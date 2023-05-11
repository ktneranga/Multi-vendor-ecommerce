import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage, HomePage } from "./Routes";
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
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:token" element={<ActivationPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
