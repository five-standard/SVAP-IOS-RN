import axios from "axios";
import Asyncstorage from "@react-native-async-storage/async-storage";

export * from "./Petition";
export * from "./Report";
export * from "./User";
export * from "./Vote";

export const instance = axios.create({
  baseURL: "https://prod-server.xquare.app/svap",
  timeout: 3000,
});

instance.interceptors.request.use(
  async (res) => {
    const token = await Asyncstorage.getItem("accessToken");
    if (token) {
      res.headers.Authorization = token;
    }
    return res;
  },
  (err) => {
    return err;
  }
);
