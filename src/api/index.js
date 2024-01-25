import axios from "axios";
import { postRefresh } from "./User";
import { getToken, setToken } from "../utils/strToken";

export const instance = axios.create({
  baseURL: "https://prod-server.xquare.app/svap",
  timeout: 3000,
});

instance.interceptors.request.use(async (res) => {
  const { accessToken } = await getToken();
  if (accessToken && res.url !== "/user/reissue") {
    res.headers.Authorization = "Bearer " + accessToken;
  }
  return res;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 403) {
      const data = await getToken();
      postRefresh(data.refreshToken)
        .then((res) => {
          setToken(res.data);
        })
        .catch(() => {});
    }
    return err;
  }
);
