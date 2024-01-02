import React, { useState, useEffect } from "react";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { BlueDot } from "utills/svgs/BlueDot";
import { BluePointRight } from "utills/svgs/BluePointRight";
import { NoDataFound } from "components/common/NoDataFound";
import {
  formatTimestamp,
  formatTime,
  dateFromating,
} from "../../../utills/moment";
import {
  updateBusinesGroupPermissionStatusThunk,
  updateBusinessGroupstatusThunk,
  fetchRoleGroupsThunk,
} from "store/settings/team/team";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setLoader } from "store/global/globalReducer";

const getPermissionUpdate = (
  updatedData,
  groupIndex,
  moduleIndex,
  permissionIndex,
  status
) => {
  if (
    groupIndex >= 0 &&
    groupIndex < updatedData.length &&
    moduleIndex >= 0 &&
    moduleIndex < updatedData[groupIndex].business_modules.length &&
    permissionIndex >= 0 &&
    permissionIndex <
      updatedData[groupIndex].business_modules[moduleIndex].permissions.length
  ) {
    const group = updatedData[groupIndex];
    const module = group.business_modules[moduleIndex];
    const permission = module.permissions[permissionIndex];

    const updatedPermission = {
      ...permission,
      permission_status: status,
    };

    const updatedModule = {
      ...module,
      permissions: [
        ...module.permissions.slice(0, permissionIndex),
        updatedPermission,
        ...module.permissions.slice(permissionIndex + 1),
      ],
    };

    const updatedGroup = {
      ...group,
      business_modules: [
        ...group.business_modules.slice(0, moduleIndex),
        updatedModule,
        ...group.business_modules.slice(moduleIndex + 1),
      ],
    };

    updatedData[groupIndex] = updatedGroup;
  }
  return updatedData;
};

const RoleTable = (props) => {
  const { data, setSelectedRoles, selectedRoles } = props;
  const [roleGroupData, setData] = useState([]);
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState("");
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  const handlePermissionChange = (groupIndex, moduleIndex, permissionIndex) => {
    let updatedData = [...roleGroupData];
    const permission =
      updatedData[groupIndex].business_modules[moduleIndex].permissions[
        permissionIndex
      ];
    const permission_status =
      permission?.permission_status === "active" ? "inactive" : "active";
    updatedData = getPermissionUpdate(
      updatedData,
      groupIndex,
      moduleIndex,
      permissionIndex,
      permission_status
    );
    const payload = {
      business_group_permission_id: permission?.business_group_permission_id,
      permission_status: permission_status,
    };
    dispatch(updateBusinesGroupPermissionStatusThunk(payload))
      .then(() => {
        setData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const handleGroupChange = (group) => {
    const status = group?.status === "active" ? "inactive" : "active";
    let updateRoles = [...selectedRoles];
    const findRole = selectedRoles.find(
      (role) => role.business_group_id == group.business_group_id
    );
    if (findRole) {
      const index = updateRoles.indexOf(findRole);
      updateRoles.splice(index, 1);
      setSelectedRoles(updateRoles);
      return;
    }
    setSelectedRoles([
      ...selectedRoles,
      { business_group_id: group?.business_group_id, status: status },
    ]);
  };

  const handleModuleChange = () => {};

  const handleUpdateBusinessGroupStatus = (business_group_id, status) => {
    dispatch(setLoader(true));
    const payload = {
      business_group_id: business_group_id,
      status: status,
    };
    dispatch(updateBusinessGroupstatusThunk(payload))
      .then(() => {
        dispatch(fetchRoleGroupsThunk())
          .then(() => {
            let updatedRoles = selectedRoles.filter(
              (item) => item.business_group_id !== business_group_id
            );
            setSelectedRoles(updatedRoles);
            dispatch(setLoader(false));
          })
          .catch((error) => {
            dispatch(setLoader(false));
            console.log(error);
          })
          .finally(() => {
            dispatch(setLoader(false));
          });
      })
      .catch((error) => {
        dispatch(setLoader(false));

        console.log(error);
      });
  };

  const [showGroup, setShowGroup] = useState(false);
  const [groupId, setGroupId] = useState([]);

  const toggleModules = (business_group_id) => {
    const newGroupId = [...groupId];

    const findId = newGroupId.find((id) => id === business_group_id);
    if (findId) {
      const index = newGroupId.indexOf(findId);
      newGroupId.splice(index, 1);
      setGroupId(newGroupId);
    } else {
      setGroupId([...newGroupId, business_group_id]);
    }

    setShowGroup(!showGroup);
  };

  return (
    <div className="mt-5 md:px-10 relative px-5">
      <div className="role-container">
        <div>
          <div className="grid grid-cols-7 md:grid-cols-6 gap-3">
            <div className="flex gap-3 items-center col-span-3 md:col-span-2">
              <div>Role Name</div>
            </div>
            <div className="flex items-center ">Created By</div>
            <div className="flex items-center ">Created Date</div>
            <div className="flex items-center ">Last updated</div>

            <div className="flex items-center ">Actions</div>
          </div>
          <div className="team-line mt-2"> </div>
        </div>
        {roleGroupData && roleGroupData.length ? (
          roleGroupData.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="grid grid-cols-7 md:grid-cols-6 mt-3 gap-3">
                <div className="flex gap-3 col-span-3 role-body md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedRoles.some(
                          (item) =>
                            item.business_group_id == group.business_group_id
                        ) ?? false
                      }
                      onChange={() => handleGroupChange(group)}
                    />
                  </div>
                  <div className="flex gap-1 items-center">
                    <div
                      onClick={() => toggleModules(group?.business_group_id)}
                      className="flex items-center cursor-pointer"
                    >
                      <span
                        className={`${
                          showGroup && groupId.includes(group.business_group_id)
                            ? "transform rotate-90"
                            : "defaultClass"
                        }`}
                      >
                        {" "}
                        <BluePointRight />
                      </span>
                    </div>
                    <div className="flex items-center">
                      {group?.business_group_name}
                    </div>
                    <div className="role-type ml-2">
                      {group?.business_group_type}
                    </div>
                  </div>
                </div>
                <div className="role-body">
                  {group?.user?.first_name} {group?.user?.last_name}
                </div>
                <div className="role-body">
                  <div className="created-date">
                    {dateFromating(group.created_at)}
                  </div>
                  <div className="created-time">
                    at {formatTime(group.created_at)}
                  </div>
                </div>
                <div className="role-body">
                  <div className="created-date">
                    {dateFromating(group.created_at)}
                  </div>
                  <div className="created-time">
                    at {formatTime(group.updated_at)}
                  </div>
                </div>

                <div className=" flex gap-2 ">
                  {/* <div>
                    <BgEditIcon />
                  </div> */}
                  <div
                    onClick={() =>
                      handleUpdateBusinessGroupStatus(
                        group?.business_group_id,
                        "inactive"
                      )
                    }
                    className="cursor-pointer"
                  >
                    <BgDeleteIcon />
                  </div>
                </div>
              </div>
              <div>
                {groupId.includes(group.business_group_id) ? (
                  <motion.div
                    initial={{ y: "-80", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-80", opacity: 0 }}
                    transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
                  >
                    {" "}
                    {group && group?.business_modules.length
                      ? group?.business_modules.map((module, moduleIndex) => (
                          <div key={moduleIndex}>
                            <div className="flex  border-items-container">
                              <div className="hidden-check">
                                <input
                                  type="checkbox"
                                  checked={
                                    module?.business_module_status === "active"
                                  }
                                  onChange={() => handleModuleChange}
                                />
                                <input type="checkbox" />
                              </div>
                              <div className=" border-items-wrapper ">
                                <div className="border-item-one relative gap-1 flex  pt-7 items-center">
                                  <div className="bottom-line">
                                    <div className="hidden-check">e</div>
                                  </div>
                                  <div className="flex gap-1 items-center role-item">
                                    <div>
                                      <BlueDot />
                                    </div>
                                    <div>{module?.business_module_name}</div>
                                    {module && module?.permissions.length
                                      ? module?.permissions.map(
                                          (permission, permissionIndex) => (
                                            <div
                                              key={permissionIndex}
                                              className=" pl-4 flex items-center gap-1"
                                            >
                                              <input
                                                type="checkbox"
                                                className="scale-75"
                                                checked={
                                                  permission.permission_status ===
                                                  "active"
                                                }
                                                onChange={() =>
                                                  handlePermissionChange(
                                                    groupIndex,
                                                    moduleIndex,
                                                    permissionIndex
                                                  )
                                                }
                                              />
                                              <div>
                                                {permission?.permission_name}
                                              </div>
                                            </div>
                                          )
                                        )
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}
                  </motion.div>
                ) : (
                  ""
                )}
              </div>

              <div className="team-line mt-5"> </div>
            </div>
          ))
        ) : (
          <NoDataFound message="No Data Found" />
        )}
      </div>
    </div>
  );
};
export default RoleTable;
