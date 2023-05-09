import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from "./Routes";
import "./App.css";
import axios from "axios";
import { server } from "./server";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/getuser`, {
          withCredentials: true,
        });
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getUser();
  }, []);
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/activation/:token" element={<ActivationPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
