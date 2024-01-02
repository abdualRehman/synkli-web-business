import React, { useEffect } from "react";
import { AnnDetailsJumbo } from "./AnnDetailsJumbo";
import { AnnDetailsCards } from "./AnnDetailsCards";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllNewsThunk,
  getSingleNewsThunk,
} from "store/workspace/workspaceNews";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { setLoader } from "store/global/globalReducer";

export const AnnDetails = ({ toggleEditAnn, annUpdated }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const business_id = localStorage.getItem(BUSINESS_ID);

  const fetchLatest = () => {
    dispatch(getAllNewsThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  useEffect(() => {
    const payload = {
      business_id,
      news_id: id,
    };
    dispatch(setLoader(true));
    dispatch(getSingleNewsThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        fetchLatest();
      });
  }, [dispatch, id, annUpdated]);
  return (
    <div>
      <AnnDetailsJumbo />
      <AnnDetailsCards toggleEditAnn={toggleEditAnn} />
    </div>
  );
};
