import axios from "axios";
import { appConfig } from "../config/app";

const axiosInstance = axios.create({
  baseURL: appConfig.backendURL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});
export default axiosInstance;
