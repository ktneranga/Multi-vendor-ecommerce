import axios from "axios";
import { server } from "../../server";

const getUser = async () => {
  const user = await axios.get(`${server}/user/getuser`, {
    withCredentials: true,
  });

  return user;
};

export default {
  getUser,
};
