import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN, AUTHORIZATION, REFRESH_TOKEN } from "utills/globalVars";

const url = process.env.REACT_APP_BASE_URL;
const timeoutMilliseconds = 20000; // 20 seconds

const access_token = localStorage.getItem(ACCESS_TOKEN);
const refresh_token = localStorage.getItem(REFRESH_TOKEN);

const axiosOptions = {
  baseURL: "https://api.synkli.dev/api",
};
const instance = axios.create(axiosOptions);

// instance.interceptors.request.use((config) => {

//   if (access_token) {
//     config.headers[AUTHORIZATION] = `Bearer ${access_token}`;
//   }
//   return config;
// });

export default instance;
