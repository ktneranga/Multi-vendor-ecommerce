import axios from "axios";
import { server } from "../../server";

const sellerLoginService = async (sellerData) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  };

  const seller = await axios.post(
    `${server}/shop/seller-login`,
    sellerData,
    config
  );

  return seller;
};

const loadSellerService = async () => {
  const config = {
    withCredentials: true,
  };

  const seller = await axios.get(`${server}/shop/get-seller`, config);

  return seller;
};

export default { sellerLoginService, loadSellerService };
