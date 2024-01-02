import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logoutThunk } from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (setIsConfirmationOpen, sidebarLog) => {
    if (sidebarLog) {
      dispatch(setIsConfirmationOpen(false));
    } else {
      setIsConfirmationOpen(false);
    }

    dispatch(setLoader(true));
    dispatch(login.actions.handleUpdate(null));
    dispatch(logoutThunk())
      .then((response) => {
        if (response.payload) {
          localStorage.setItem(ACCESS_TOKEN, "");
          localStorage.setItem(REFRESH_TOKEN, "");
          localStorage.setItem(BUSINESS_ID, "");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  return { logout };
};
