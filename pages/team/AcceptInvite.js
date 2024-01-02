import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { acceptInviteThunk } from "store/settings/team/team";
import { useLogout } from "Hooks/useLogout";

export const AcceptInvite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [data, setData] = useState(null);
  const { logout } = useLogout();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleNavigate = () => {
    logout(setIsConfirmationOpen);
  };
  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(acceptInviteThunk({ invite_token: token }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, []);
  return (
    <div>
      <div className="page-404-header absolute top-5 left-5">SYNKLI</div>
      <div className="page-404">
        <div>
          <div className="page-404-text ">
            {data && <span>{data?.message}</span>}
          </div>
          <div>
            {" "}
            <button
              disabled={!data ? true : false}
              onClick={handleNavigate}
              className="page-404-btn px-5"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
