import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../server";

const SellerActivationPage = () => {
  const { token } = useParams();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      const activateSellerAccount = async () => {
        try {
          const res = await axios.post(`${server}/shop/activation`, { token });
          console.log(res.data.message);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      };
      activateSellerAccount();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
