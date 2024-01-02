import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBusinessGroupsThunk,
  fetchBusinessEmployeeThunk,
  updateBusinessEmployeeThunk,
} from "store/settings/team/team";
import { TeamDetailSkeleton } from "./team-skeleton/TeamDetailSkeleton";
import { motion } from "framer-motion";
import { SecondSmallLoader } from "components/common/SecondSmallLoader";
import { SideTimes } from "utills/svgs/SideTimes";

import { CameraIcon } from "utills/svgs/CameraIcon";
import "./css/teamDetails.css";
import { setSideLoader } from "store/global/globalReducer";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
export const EditMember = ({ business_employee_id, handleEditMember }) => {
  const dispatch = useDispatch();
  const [detailLoader, setDetailLoader] = useState(false);
  const [employee, setEmployee] = useState(null);
  const { sideLoader } = useSelector((state) => state.global);
  const [businessGroups, setBusinessGroups] = useState(null);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [businessGroup, setBusinessGroup] = useState("");

  const deleteMember = (business_employee_id) => {
    return;
  };

  const updateEmployee = () => {
    const updateEmployeeData = {
      business_employee_id,
      first_name,
      last_name,
      business_group_id: businessGroup,
    };

    dispatch(setSideLoader(true));
    dispatch(updateBusinessEmployeeThunk(updateEmployeeData))
      .then((response) => {
        console.log(response.data);
        if (response.payload) {
          handleEditMember(business_employee_id);
        }
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
    dispatch(fetchBusinessEmployeeThunk({ business_employee_id }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setEmployee(response.payload);
          setFirstName(response.payload.first_name);
          setLastName(response.payload.last_name);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      dispatch(fetchAllBusinessGroupsThunk())
        .then((response) => {
          if (response.payload) {
            setBusinessGroups(response.payload);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setDetailLoader(false);
        });
    }, 1000);
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
          <div>
            <div
              onClick={() => handleEditMember(business_employee_id)}
              className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>
          </div>

          <div className="service-info pt-10 p-5">
            <div className="title">Team Details</div>

            <div className="branch-navigate mt-1">
              Setting &gt; Team{" "}
              <span className="bn-black"> &gt; Team Details</span>
            </div>
          </div>

          {detailLoader ? (
            <TeamDetailSkeleton />
          ) : (
            <div>
              {employee && (
                <div className="detail-info flex gap-5 px-5 relative">
                  <div>
                    {employee?.image ? (
                      <div className="detail-profile-wrapper relative">
                        <div className="edit-team-camera">
                          <CameraIcon />{" "}
                        </div>
                        <img
                          src={employee?.image}
                          alt="profile"
                          className="detail-image"
                        />
                      </div>
                    ) : (
                      <div>
                        <DefaultUserIcon />{" "}
                      </div>
                    )}
                  </div>
                </div>
              )}{" "}
            </div>
          )}

          <div className="team-line mt-3 mx-5"></div>

          <div className="add-ann-form p-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-1">
              <label>Email</label>
              <div className="locked-input mt-1">
                {employee && <span>{employee.email}</span>}
              </div>
            </div>
            <div className="mt-1">
              <label>Contact Number</label>
              <div className="locked-input mt-1">
                {employee && <span>{employee.phone_number}</span>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="col-span-2">
                <select onChange={(e) => setBusinessGroup(e.target.value)}>
                  <option value="" selected disabled>
                    select
                  </option>
                  {businessGroups &&
                    businessGroups.map((permission) => (
                      <option
                        value={permission.business_group_id}
                        key={permission.business_group_id}
                      >
                        {permission.business_group_name}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="select-group-btn cursor-pointer">Add</div> */}
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div
              className="select-group-btn cursor-pointer px-10 flex gap-2 items-center"
              onClick={updateEmployee}
            >
              Update {sideLoader && <SmallLoaderWhite />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
