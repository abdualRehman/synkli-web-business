import { BlueTimes } from "utills/svgs/BlueTimes";
import { RefreshIcon } from "utills/svgs/RefreshIcon";
import "./css/teams.css";

import { Loader } from "components/common/Loader";
import { useEffect, useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader, setSideLoader } from "store/global/globalReducer";
import {
  fetchInvitedEmployeesThunk,
  revokeEmployeeInviteThunk,
  sendEmployeeInviteThunk,
} from "store/settings/team/team";
import { NoTeam } from "../NoTeam";

import { IncompleteCircle } from "utills/svgs/IncompleteCircle";
import { useUID } from "react-uid";
import { generateId } from "utills/uid";
import ConfirmationModal from "utills/confirmationModal";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR } from "utills/globalVars";

const InvitedTeam = ({
  toggleTeamDetails,
  handleMember,
  inviteUpdated,
  searchTerm,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const { sideLoader } = useSelector((state) => state.global);
  const [loadIndex, setLoadIndex] = useState(null);
  const [team, setTeam] = useState(null);
  const [teamUpdated, setTeamUpdated] = useState(false);
  const [resendUpdated, setResendUpdated] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [invite_id, setInviteId] = useState("");

  const { data: loginData } = useSelector((state) => state.login);
  // const { allPermissions } = useSelector((state) => state.global);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  function showDetails(id) {
    const findMember = filteredTeam.find((member) => member.id === id);
    handleMember(findMember);
    toggleTeamDetails();
  }
  const filteredTeam = team?.filter((member) => {
    return (
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.business_group_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

  const resendInvitation = (invite_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.write
    ) {
      const member = team?.find((member) => member.invite_id === invite_id);
      const index = team?.indexOf(member);
      setLoadIndex(index);
      console.log(member);
      setResendUpdated(!resendUpdated);
      const resendInviteData = {
        first_name: member?.first_name,
        last_name: member?.last_name,
        email: member?.email,
        phone_number: member?.phone_number,
        business_group_id: member?.business_group_id,
      };

      dispatch(setSideLoader(true));
      dispatch(sendEmployeeInviteThunk(resendInviteData))
        .then((response) => {
          console.log(response.payload);
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

  const handleDelete = () => {
    setIsConfirmationOpen(false);
    const member = team?.find((member) => member.invite_id === invite_id);
    const index = team?.indexOf(member);
    setDeleteIndex(index);

    const revokeData = {
      invite_id,
    };
    setTeamUpdated(!teamUpdated);

    dispatch(setSideLoader(true));
    dispatch(revokeEmployeeInviteThunk(revokeData))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  const removeInvitation = (invite_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.write
    ) {
      setIsConfirmationOpen(true);
      setInviteId(invite_id);
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));

    setTimeout(() => {
      dispatch(fetchInvitedEmployeesThunk())
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
    }, 500);
  }, [dispatch, inviteUpdated, teamUpdated]);

  return (
    <div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="md:px-10 mt-8 px-5 relative">
        {isLoading && <Loader />}
        <div className={`${isLoading && "opacity-25"}`}>
          <div className="">
            <div>
              {team && team[0] ? (
                <div>
                  <div className="invited-team grid grid-cols-6 gap-5 place-items-center justify-items-start ">
                    <div className="flex-1 flex gap-10 items-center">
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
                    {filteredTeam.map((member, index) => (
                      <div key={generateId()}>
                        {" "}
                        <div className=" team-members grid grid-cols-6 gap-5 py-2  cursor-pointer ">
                          <div className="flex-1 flex gap-10 items-center">
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
                          <div className="flex-1 flex items-center">
                            {member.business_group_name}
                          </div>

                          <div className="flex-1 flex gap-2 items-center">
                            <div
                              onClick={() => removeInvitation(member.invite_id)}
                            >
                              {sideLoader &&
                              deleteIndex === index &&
                              teamUpdated ? (
                                <span className="animate-spin-fast">
                                  <IncompleteCircle />
                                </span>
                              ) : (
                                <span className="animate-spin">
                                  <BlueTimes />
                                </span>
                              )}
                            </div>
                            <div
                              onClick={() => resendInvitation(member.invite_id)}
                            >
                              {sideLoader &&
                              loadIndex === index &&
                              resendUpdated ? (
                                <div className="animate-spin-fast">
                                  {" "}
                                  <RefreshIcon />{" "}
                                </div>
                              ) : (
                                <RefreshIcon />
                              )}
                            </div>
                          </div>
                        </div>
                        <div></div> <div className="border w-full"></div>
                      </div>
                    ))}
                  </div>

                  <div>
                    {team?.length > 8 && (
                      <div className=" my-5 pagination mb-5">
                        <div className="recently-added">
                          Showing 1 to 10 of {team?.length} entries
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
                    )}
                  </div>
                </div>
              ) : (
                <NoTeam />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedTeam;
