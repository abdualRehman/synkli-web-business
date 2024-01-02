import { Loader } from "components/common/Loader";
import { SecondSmallLoader } from "components/common/SecondSmallLoader";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { setSideLoader } from "store/global/globalReducer";
import {
  addRoleGroupThunk,
  fetchAllPermissionsThunk,
  getAllBusinessModulesThunk,
  fetchRoleGroupsThunk,
} from "store/settings/team/team";

import { BluePointRight } from "utills/svgs/BluePointRight";
import { SideTimes } from "utills/svgs/SideTimes";
import _ from "lodash";
import { validateTextField } from "utills/FormValidation";
const AddRoleGroup = ({ toggleAddRoleGroup }) => {
  const dispatch = useDispatch();
  const [businessModules, setBusinessModules] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const { sideLoader } = useSelector((state) => state.global);
  const [roleName, setRoleName] = useState("");
  const [toggleIndex, setToggleIndex] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [permissionsArr, setPermissionsArr] = useState([]);
  const [roleNameError, setRoleNameError] = useState(false);

  const [modules, setModules] = useState([]);

  const handleSelect = (value, e, index) => {
    console.log(index, value);
    const newModules = _.cloneDeep(businessModules);

    // permissions?.map((permission) => {
    //   newModules[index]?.permissions?.push({
    //     permission_id: permission?.permission_id,
    //   });
    // });
    const isChecked = e.target.checked;
    console.log(isChecked);
    if (!isChecked) {
      const exist = modules.find(
        (module) => module.business_module_id === value
      );
      const index = modules.indexOf(exist);
      let newModules = [...modules];
      console.log(index);
      newModules.splice(index, 1);
      setModules(newModules);
    } else {
      const module = {
        business_module_id: value,
        permissions: permissions.map((item) => {
          return { permission_id: item.permission_id };
        }),
      };
      setModules([...modules, module]);
    }
  };

  const permissionHandler = (business_module_id, permission_id, e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // let module = businessModules.find(
      //   (item) => item.business_module_id === business_module_id
      // );
      // const index = businessModules.indexOf(module);

      // module?.permissions?.unshift({ permission_id: permission_id });
      // console.log(module);

      // let newModules = [...modules];
      // newModules[index] = module;
      // setModules(newModules);
      const existingModuleIndex = modules?.findIndex(
        (item) => item.business_module_id === business_module_id
      );
      if (existingModuleIndex == -1) {
        console.log("add new");
        const module = {
          business_module_id: business_module_id,
          permissions: [{ permission_id: permission_id }],
        };
        setModules([...modules, module]);
      } else {
        const newModules = [...modules];
        newModules[existingModuleIndex]?.permissions.unshift({
          permission_id: permission_id,
        });
        setModules(newModules);
      }
    } else {
      let module = modules.find(
        (module) => module.business_module_id === business_module_id
      );
      const index = modules.indexOf(module);
      const permissionsList = module?.permissions?.filter(
        (item) => item.permission_id !== permission_id
      );
      let newModules = [...modules];
      newModules[index] = module;
      module.permissions = permissionsList;
      if (permissionsList.length == 0) {
        newModules.splice(index, 1);
      }

      setModules(newModules);
    }
  };

  const togglePermissions = (business_module_id) => {
    const newArr = [...permissionsArr];

    setShowPermissions(!showPermissions);

    const module = businessModules?.find(
      (m) => m.business_module_id === business_module_id
    );
    const index = businessModules.indexOf(module);

    newArr.push(index);
    setPermissionsArr(newArr);

    const valueToCheck = business_module_id;

    let isFound = false;

    for (const item of newArr) {
      if (item === valueToCheck) {
        isFound = true;
        break; // Exit the loop as soon as a match is found
      }
    }

    if (isFound) {
      console.log(`${valueToCheck} is in the array.`);
      const index = newArr.indexOf(valueToCheck);
      newArr.splice(index, 1);
      setPermissionsArr(newArr);
    } else {
      console.log(`${valueToCheck} is not in the array.`);
      newArr.unshift(valueToCheck);
      setPermissionsArr(newArr);
    }
  };
  const hasPermissions = (business_module_id, permission_id) => {
    const moduleExist = modules?.find(
      (item) => item.business_module_id == business_module_id
    );
    if (!moduleExist) {
      return false;
    }
    const index = modules.indexOf(moduleExist);
    if (
      modules[index]?.permissions?.some(
        (item) => item.permission_id == permission_id
      )
    ) {
      return true;
    }
    return false;

    // modules[index]?.permissions?.some(
    //   (item) => item.permission_id == permission_id
    // ),
  };
  const handleSubmit = () => {
    if (roleNameError) {
      toastHandler("Invalid role name", "error");
      return;
    }
    if (!roleName || !modules.length > 0) {
      toastHandler("Please fill in required fields", "error");
      return;
    }

    const payload = {
      business_group_name: roleName,
      business_group_type: "Customized",
      business_modules: modules,
    };

    dispatch(setSideLoader(true));
    dispatch(addRoleGroupThunk(payload))
      .then((response) => {
        console.log(response.payload);
        dispatch(fetchRoleGroupsThunk())
          .then(() => {
            toggleAddRoleGroup();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  const handleRoleName = (e) => {
    const { value } = e.target;
    if (validateTextField(value)) {
      setRoleNameError(false);
    } else {
      setRoleNameError(true);
    }

    setRoleName(value);
  };

  const fetchPermissions = () => {
    dispatch(fetchAllPermissionsThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setPermissions(response.payload);
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
    dispatch(setSideLoader(true));
    dispatch(getAllBusinessModulesThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setBusinessModules(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchPermissions();
      });
  }, [dispatch]);

  return (
    <div className="add-p-side grid grid-cols-6 text-black">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-2">
        <div className="">
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
            className="inner-right relative"
          >
            {sideLoader && <Loader />}
            <div>
              <div
                onClick={toggleAddRoleGroup}
                className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
              >
                <SideTimes />
              </div>

              <div className="add-detail pt-10 px-5">
                <div className="title">Add Role Group</div>

                <div className="jumbo-dir mt-2">
                  Settings &gt; Role management
                  <span className="special-jumbo-text"> &gt; Add Role</span>
                </div>
              </div>
            </div>

            <div>
              <div className="add-ann-form mb-5">
                <div className=" mt-5 px-5">
                  <div>
                    <div>
                      <label>Role Name</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        maxLength={40}
                        placeholder="Role name"
                        className="px-3 rounded-xl mt-1"
                        onChange={handleRoleName}
                      />
                      <div className="error-div mt-1">
                        {roleNameError && roleName && (
                          <span> {"Invalid role name"} </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {businessModules &&
                businessModules.map((module, index) => (
                  <div
                    className={`mx-5 my-2 `}
                    key={module?.business_module_id}
                  >
                    <div className="flex gap-3  role-body">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            modules?.some((item) => {
                              return (
                                item.business_module_id ==
                                  module.business_module_id &&
                                item?.permissions.length
                              );
                            })
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleSelect(module?.business_module_id, e, index)
                          }
                        />
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() =>
                            togglePermissions(module?.business_module_id)
                          }
                        >
                          {permissionsArr.includes(
                            module?.business_module_id
                          ) ? (
                            <span className="transform rotate-90">
                              {" "}
                              <BluePointRight />{" "}
                            </span>
                          ) : (
                            <BluePointRight />
                          )}
                        </div>
                        <div className="flex items-center">
                          {module?.business_module_name}
                        </div>
                      </div>
                    </div>
                    {permissionsArr.includes(module?.business_module_id) ? (
                      <div className="flex  border-items-container py-3">
                        <div className="hidden-check">
                          <input type="checkbox" />
                          <input type="checkbox" />
                        </div>

                        <div className=" border-items-wrapper ">
                          {permissionsArr.includes(module?.business_module_id)
                            ? permissions.map((permission, pIndex) => (
                                <motion.div
                                  initial={{ x: "60", opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.5, type: "tween" }}
                                  key={permission?.permission_id}
                                  className="border-item-one relative gap-1 flex  pt-7 items-center"
                                >
                                  <div className="bottom-line">
                                    <div className="hidden-check">e</div>
                                  </div>
                                  <div className="flex gap-1 items-center role-item">
                                    <div className="mt-1 scale-75">
                                      <input
                                        type="checkbox"
                                        checked={
                                          hasPermissions(
                                            module.business_module_id,
                                            permission.permission_id
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          permissionHandler(
                                            module.business_module_id,
                                            permission.permission_id,
                                            e
                                          );
                                        }}
                                      />
                                    </div>
                                    <div> {permission?.permission_name} </div>
                                  </div>
                                </motion.div>
                              ))
                            : ""}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <hr className="mt-2"></hr>
                  </div>
                ))}
            </div>

            <div className="my-5 mt-10 flex justify-center items-center">
              <button
                onClick={handleSubmit}
                className="add-btn px-10 add-role-btn py-2 cursor-pointer text-white rounded-lg"
              >
                Add Role Group
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default AddRoleGroup;
