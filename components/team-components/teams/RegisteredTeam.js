import { Loader } from "components/common/Loader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader, setSideLoader } from "store/global/globalReducer";
import {
  businessEmployeeArchiveThunk,
  fetchRegisteredEmployeesThunk,
} from "store/settings/team/team";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { ErrorIcon } from "utills/svgs/ErrorIcon";
import { EyeIcon } from "utills/svgs/EyeIcon";
import { NoTeam } from "../NoTeam";
import { PermissionsModal } from "../modals/PermissionsModal";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import ConfirmationModal from "utills/confirmationModal";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR } from "utills/globalVars";
const RegisteredTeam = ({
  handleMember,
  handleEditMember,
  registeredUpdated,
  searchTerm,
}) => {
  const dispatch = useDispatch();
  const { isLoading, sideLoader } = useSelector((state) => state.global);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [business_employee_id, setBusinessEmployeeId] = useState(false);
  const [team, setTeam] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { data: loginData } = useSelector((state) => state.login);
  // const { allPermissions } = useSelector((state) => state.global);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const viewMember = (business_employee_id) => {
    console.log(business_employee_id);
    handleMember(business_employee_id);
  };

  const handleDelete = () => {
    setIsConfirmationOpen(false);
    const member = team?.find(
      (member) =>
        member?.business_employee?.business_employee_id === business_employee_id
    );
    const index = team.indexOf(member);
    setDeleteIndex(index);
    console.log(index, member);
    dispatch(setSideLoader(true));
    dispatch(businessEmployeeArchiveThunk({ business_employee_id }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          const newTeam = team?.filter(
            (member) =>
              member.business_employee?.business_employee_id !==
              business_employee_id
          );
          setTeam(newTeam);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSideLoader(false);
      });
  };
  const deleteUser = (business_employee_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.write
    ) {
      setIsConfirmationOpen(true);
      setBusinessEmployeeId(business_employee_id);
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(fetchRegisteredEmployeesThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setTeam(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [registeredUpdated, dispatch]);

  // function toggleRoleAndMember(id) {
  //   const findMember = filteredTeam.find((member) => member.id === id);
  //   handleTeamMember(findMember);
  //   toggleAddRole();
  // }

  const showModal = (rowIndex) => {
    setHoveredIndex(rowIndex);
    console.log(rowIndex);
  };
  const exitModal = (rowIndex) => {
    setHoveredIndex(null);
  };

  const filteredTeam = team?.filter((member) => {
    return (
      member?.first_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      member?.last_name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      member?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      member?.phone_number?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      member?.business_group_name
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase())
    );
  });

  return (
    <div className="md:px-10 mt-20 px-5 relative ">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      {isLoading && <Loader />}
      {!team ? (
        <NoTeam />
      ) : (
        <div>
          <div className="invited-team-wrapper">
            {/* {hoveredIndex === 0 ? (
              <PermissionsModal permissions={team[0]?.business_group_modules} />
            ) : (
              ""
            )} */}
            <div className="invited-team grid grid-cols-7 gap-5 place-items-center justify-items-start ">
              <div className="flex-1 flex gap-3  items-center">
                <div>Picture</div>
                <div> First Name</div>
              </div>

              <div className="flex-1">Last Name</div>
              <div className="flex-1">Email</div>
              <div className="flex-1">Contact No</div>
              <div className="flex-1">Role Group</div>

              <div className="flex-1">Actions</div>
            </div>
            <div className="border w-full mt-2"></div>
            <div>
              {team
                ? filteredTeam?.map((member, index) => (
                    <motion.div
                      initial={{ x: "80", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="relative"
                      key={index}
                      onMouseEnter={() => showModal(index)}
                      onMouseLeave={() => exitModal(index)}
                    >
                      {/* {hoveredIndex &&
                      hoveredIndex === index &&
                      team &&
                      member?.business_group_modules &&
                      member?.business_group_modules[0] ? (
                        <PermissionsModal
                          permissions={member?.business_group_modules}
                        />
                      ) : (
                        ""
                      )}{" "} */}
                      <div
                        className={` team-members  grid grid-cols-7 py-2 gap-5 cursor-pointer ${
                          sideLoader && deleteIndex === index
                            ? "animate-pulse"
                            : ""
                        }`}
                      >
                        <div className="flex-1 flex gap-3   items-center">
                          <div>
                            {member?.image ? (
                              <div className="team-profile-image-wrapper">
                                <img
                                  src={member?.image}
                                  alt="member"
                                  className="member-image-table"
                                  onClick={() =>
                                    viewMember(
                                      member?.business_employee
                                        ?.business_employee_id
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <span className="flex justify-center items-center ">
                                  {" "}
                                  <DefaultUserIcon />{" "}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>{member.first_name}</div>
                        </div>
                        <div className="flex-1 flex items-center">
                          {member.last_name}
                        </div>
                        <div className="flex-1 flex items-center">
                          {member.email}
                        </div>

                        <div className="flex-1 flex items-center">
                          {member.phone_number}
                        </div>
                        {member.business_group_modules ? (
                          <div className="flex-1 flex items-center">
                            {member?.business_group_name}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            {" "}
                            <ErrorIcon />{" "}
                          </div>
                        )}

                        <div className="flex-1 flex gap-2 items-center">
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              viewMember(
                                member?.business_employee?.business_employee_id
                              )
                            }
                          >
                            <EyeIcon />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              handleEditMember(
                                member?.business_employee?.business_employee_id
                              )
                            }
                          >
                            <BgEditIcon />
                          </div>

                          <div
                            onClick={() =>
                              deleteUser(
                                member?.business_employee?.business_employee_id
                              )
                            }
                          >
                            {sideLoader && deleteIndex === index ? (
                              <span className="animate-ping">
                                <BgDeleteIcon />
                              </span>
                            ) : (
                              <BgDeleteIcon />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border w-full "></div>
                    </motion.div>
                  ))
                : ""}
            </div>
          </div>

          {/* {team?.length > 8 && (
            <div className=" my-5 pagination ">
              <div className="recently-added">
                Showing 6 to 10 of 26 entries
              </div>
              <div className="pagination-btns">
                <button>Previous</button>
                <button className="btn-1-pag">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button className="next-btn">Next</button>
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};
export default RegisteredTeam;
