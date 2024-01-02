import { motion } from "framer-motion";
import "./css/teamDetails.css";
import { SideTimes } from "utills/svgs/SideTimes";

import { TeamDetailSkeleton } from "./team-skeleton/TeamDetailSkeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  businessEmployeeArchiveThunk,
  fetchBusinessEmployeeThunk,
  resetPasswordOfEmployeeThunk,
} from "store/settings/team/team";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { PrinterIcon } from "utills/svgs/PrinterIcon";
import { setSideLoader } from "store/global/globalReducer";

import { SecondSmallLoader } from "components/common/SecondSmallLoader";
import { generateId } from "utills/uid";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR } from "utills/globalVars";
const TeamDetails = ({ id, toggleTeamDetails, handleEditMember }) => {
  const dispatch = useDispatch();
  const [detailLoader, setDetailLoader] = useState(false);
  const [employee, setEmployee] = useState(null);
  const { sideLoader } = useSelector((state) => state.global);
  const [isZoomed, setIsZoomed] = useState(false);
  // const { data: loginData } = useSelector((state) => state.login);
  const { data: loginData } = useSelector((state) => state.login);
  // const { allPermissions } = useSelector((state) => state.global);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const deleteMember = (business_employee_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.write
    ) {
      console.log(business_employee_id);
      dispatch(setSideLoader(true));
      dispatch(businessEmployeeArchiveThunk(business_employee_id))
        .then((response) => {
          if (response.payload) {
            toggleTeamDetails();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setSideLoader(false));
        });
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }
  };

  const handleResetPassword = (user_id) => {
    dispatch(resetPasswordOfEmployeeThunk({ user_id }))
      .then((response) => {
        toastHandler(
          "Email sent to employee with his one time password",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  useEffect(() => {
    setDetailLoader(true);
    dispatch(fetchBusinessEmployeeThunk({ business_employee_id: id }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setEmployee(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDetailLoader(false);
      });
  }, [dispatch]);

  return (
    <div className="add-branch-side grid grid-cols-6 add-p-side relative">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="col-span-6 md:col-span-2 right-side">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          {sideLoader && <SecondSmallLoader />}
          <div>
            <div
              onClick={toggleTeamDetails}
              className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>
          </div>

          <div className="service-info pt-10 p-5">
            <div className="title">Team Details</div>

            <div className="branch-navigate mt-1">
              Setting &gt; Team
              <span className="bn-black"> &gt; Team Details</span>
            </div>
          </div>

          {detailLoader ? (
            <TeamDetailSkeleton />
          ) : (
            <div>
              {employee && (
                <div className="detail-info flex gap-5 px-5 relative">
                  <div className="team-detail-operations absolute right-5">
                    <div className="flex items-center gap-1">
                      {loginData?.is_employee && (
                        <div
                          className="cursor-pointer"
                          onClick={() => handleResetPassword(employee?.user_id)}
                        >
                          <PrinterIcon />
                        </div>
                      )}
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          handleEditMember(
                            employee?.business_employee?.business_employee_id
                          )
                        }
                      >
                        <BgEditIcon />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          deleteMember(
                            employee?.business_employee?.business_employee_id
                          )
                        }
                      >
                        {" "}
                        <BgDeleteIcon />{" "}
                      </div>
                    </div>{" "}
                  </div>
                  <div>
                    {employee?.image ? (
                      <div className="detail-profile-wrapper">
                        <img
                          src={employee?.image}
                          alt="profile"
                          className="detail-image"
                          onClick={() => setIsZoomed(true)}
                        />
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <DefaultUserIcon />{" "}
                      </div>
                    )}

                    {isZoomed && (
                      <ZoomImage
                        src={employee?.image}
                        alt="Profile"
                        onClose={() => setIsZoomed(false)}
                      />
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    <div>
                      <div className="detail-title">
                        {employee.first_name} {employee.last_name}
                      </div>

                      <div className="detail-email">{employee.email}</div>
                      <div className="detail-number">
                        {employee.phone_number}
                      </div>
                    </div>
                  </div>
                </div>
              )}{" "}
            </div>
          )}

          <div className="team-line mt-3 mx-5"></div>

          <div className="more-details p-5">
            <div className="more-title ">Role Group</div>
            <div className="rols-group">
              <div className="mt-3"> {employee?.business_group_name} </div>
              <div className="module-permissions relative mt-5">
                {employee &&
                  employee?.business_group_modules?.map((p, index) => (
                    <div
                      key={generateId()}
                      className="module-container flex items-end pt-5 relative"
                    >
                      <div className="module-line"> </div>
                      <div className="test-div flex items-center">
                        <div className="module-name pl-5">
                          {" "}
                          {p.business_module_name}
                        </div>
                        <div className="flex gap-2 flex-wrap pl-2">
                          {p.permissions &&
                            p.permissions.map((pm) => (
                              <div
                                key={generateId()}
                                className={`module-permission ${
                                  index + (1 % 2) === 0 && "even-permission"
                                }`}
                              >
                                {" "}
                                {pm.permission_name}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamDetails;
