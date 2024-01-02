import Cookies from "js-cookie";
import { toastHandler } from "../responseHanlder";
import instance from "./_instance";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";
import axios from "axios";
const url = "https://api.synkli.dev/api";

const refreshToken = async (methodRequest, endpointRequest, dataRequest) => {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    console.log(refresh_token, "refreshtoken");

    const res = await axios.post(`${url}/auth/generate-access-token`, {
      refresh_token,
    });

    const data = res.data;
    console.log(data.data.access_token, "refreshdata");
    localStorage.setItem(ACCESS_TOKEN, data.data.access_token);
    makeHttpRequest(methodRequest, endpointRequest, dataRequest);
  } catch (error) {
    localStorage.setItem(ACCESS_TOKEN, "");
    localStorage.setItem(REFRESH_TOKEN, "");
    localStorage.setItem(BUSINESS_ID, "");
    window.location.href = "/";
  }
};

export const makeHttpRequest = async (method, endpoint, data) => {
  const access_token = localStorage.getItem(ACCESS_TOKEN);

  const url = endpoint;

  const config = {
    method: method,
    url: url,
    data: data,
    headers: {
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
  console.log(config);
  try {
    const response = await instance(config);
    console.log(response, "response");

    //development
    if (response.headers["content-type"].includes("/html")) {
      toastHandler("Something went wrong", "error");
      return;
    }
    if (response.status === 401) {
      localStorage.setItem("access_token", "");
      localStorage.setItem("business_id", "");
      window.location.href = "/login";
    }

    if (response.data.data.message) {
      toastHandler(response.data.data.message, "success");
    }

    // if (response?.error.length) {
    //   response?.data.error?.map((error) => {
    //     toastHandler(error, TOAST_TYPE_ERROR);
    //     return;
    //   });
    // }
    return response.data.data;
  } catch (error) {
    console.log(error, "responses");
    if (error?.response?.status === 404) {
      toastHandler("Error 404", "error");
    }
    if (error?.response?.status === 401) {
      refreshToken(method, endpoint, data);
      // toastHandler("Unauthorized request", "error");
    }
    if (error && !error.response) {
      toastHandler(error.message, "error");
    }
    error.response?.data?.errors?.map((error) => {
      console.log(error);
      toastHandler(error, "error");
      return null;
    });

    return null;
  }
};
