import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalPermissionsThunk } from "store/auth/slices";
import { handleAllPermissions } from "store/global/globalReducer";
import { authPermissionsThunk } from "store/settings/team/team";
import { AUTH_PERMISSIONS } from "utills/globalVars";

export const MainDashboardPage = () => {
  const { data: auth } = useSelector((state) => state.authPermissions);
  const { data: total } = useSelector((state) => state.totalPermissions);

  const dispatch = useDispatch();

  const fetchTotalPermissions = () => {
    dispatch(totalPermissionsThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          localStorage.setItem("totalPermissions", response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  useEffect(() => {
    dispatch(authPermissionsThunk())
      .then((response) => {
        if (response.payload) {
          localStorage.setItem(AUTH_PERMISSIONS, response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchTotalPermissions();
      });
  }, []);

  useEffect(() => {
    if (auth && total) {
      // console.log(
      //   total[auth.permissions.Settings[0]]
      //  );
      const tmp4 = {};
      Object.keys(auth.permissions).forEach((module) => {
        console.log({ module });
        const tmp1 = auth.permissions[module].map(
          (p) => total[p.toLowerCase()]
        );

        const tmp3 = {};
        Object.keys(total).map((p) => {
          tmp3[p] = tmp1.some((p2) => p2[p]);
        });

        tmp4[module] = tmp3;
      });
      localStorage.setItem("allPermissions", JSON.stringify(tmp4));
      dispatch(handleAllPermissions(tmp4));
      console.log({ tmp4 }, "Line 161");
    }
  }, [auth, total]);

  return <div>MainDashboardPage</div>;
};
