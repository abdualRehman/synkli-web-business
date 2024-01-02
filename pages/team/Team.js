import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import { useState } from "react";
import "../../components/appSidebarComp/appSidebar.css";
import TeamContent from "../../components/team-components/TeamContent";
import TeamDetails from "../../components/team-components/team-sides/TeamDetails";
import AddTeam from "../../components/team-components/team-sides/AddTeam";
import InviteSuccess from "../../components/team-components/team-sides/InviteSuccess";
import AddRole from "../../components/team-components/team-sides/AddRole";
import { EditMember } from "components/team-components/team-sides/EditMember";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR } from "utills/globalVars";
const Team = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [member, setMember] = useState(null);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showInviteSuccess, setShowInviteSuccess] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [teamMember, setTeamMember] = useState(null);
  const [showEditMember, setShowEditMember] = useState(false);
  const [editId, setEditId] = useState(null);
  const [registeredUpdated, setRegisteredUpdated] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [id, setId] = useState(null);
  const [inviteUpdated, setInviteUpdated] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTeamDetails = () => {
    setShowTeamDetails(!showTeamDetails);
  };

  const handleMember = (id) => {
    setId(id);
    setShowTeamDetails(true);
  };

  function handleTeamMember(member) {
    console.log(member);
    setTeamMember(member);
  }

  const toggleAddTeam = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.write
    ) {
      setShowAddTeam(!showAddTeam);
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }
  };

  const handleEditMember = (business_employee_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Team?.admin ||
      allPermissions?.Team?.write
    ) {
      setShowTeamDetails(false);
      setEditId(business_employee_id);
      setShowEditMember(!showEditMember);

      showEditMember && setRegisteredUpdated(!registeredUpdated);
    } else {
      toastHandler(
        "You dont have permission to perform this action",
        ERROR_TYPE_ERROR
      );
    }
  };

  function toggleInviteSuccess() {
    setShowAddTeam(false);
    setShowInviteSuccess(!showInviteSuccess);
    !showAddTeam && setInviteUpdated(!inviteUpdated);
  }

  function toggleAddRole() {
    setShowAddRole(!showAddRole);
  }
  return (
    <div className="app-dashboard">
      {!loginData?.is_employee ||
      allPermissions?.Role_management?.admin ||
      allPermissions?.Team?.read ||
      allPermissions?.Team?.write ? (
        <div>
          {showEditMember && (
            <EditMember
              handleEditMember={handleEditMember}
              business_employee_id={editId}
            />
          )}

          {showTeamDetails && (
            <TeamDetails
              toggleTeamDetails={toggleTeamDetails}
              id={id}
              handleEditMember={handleEditMember}
            />
          )}
          {showAddTeam && (
            <AddTeam
              toggleAddTeam={toggleAddTeam}
              toggleInviteSuccess={toggleInviteSuccess}
            />
          )}

          {showInviteSuccess && (
            <InviteSuccess toggleInviteSuccess={toggleInviteSuccess} />
          )}

          {showAddRole && (
            <AddRole toggleAddRole={toggleAddRole} teamMember={teamMember} />
          )}

          <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

          <div className={`content ${isOpen ? "squeeze" : ""}`}>
            <TeamContent
              toggleTeamDetails={toggleTeamDetails}
              handleMember={handleMember}
              toggleAddTeam={toggleAddTeam}
              toggleInviteSuccess={toggleInviteSuccess}
              toggleAddRole={toggleAddRole}
              handleTeamMember={handleTeamMember}
              inviteUpdated={inviteUpdated}
              handleEditMember={handleEditMember}
              registeredUpdated={registeredUpdated}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full h-72 flex justify-center items-center font-poppins">
            You dont have permission to access this data
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
