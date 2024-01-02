import TeamJumbo from "./TeamJumbo";
import TeamOperations from "./TeamOperations";
import InvitedTeam from "./teams/InvitedTeam";
import RegisteredTeam from "./teams/RegisteredTeam";
import { useState } from "react";
const TeamContent = ({
  toggleTeamDetails,
  handleMember,
  toggleAddTeam,
  toggleAddRole,
  handleTeamMember,
  inviteUpdated,

  handleEditMember,
  registeredUpdated,
}) => {
  const [teamToggler, setTeamToggler] = useState(false);

  const changeTeam = () => {
    setTeamToggler(!teamToggler);
  };

  const [searchTerm, setSearchTerm] = useState("");

  function searchByname(value) {
    setSearchTerm(value);
    console.log(value);
  }

  return (
    <div className="team-content">
      <TeamJumbo />
      <TeamOperations
        changeTeam={changeTeam}
        toggleAddTeam={toggleAddTeam}
        searchByname={searchByname}
      />
      <div>
        {!teamToggler ? (
          <InvitedTeam
            toggleTeamDetails={toggleTeamDetails}
            handleMember={handleMember}
            inviteUpdated={inviteUpdated}
            searchTerm={searchTerm}
          />
        ) : (
          <RegisteredTeam
            handleTeamMember={handleTeamMember}
            toggleAddRole={toggleAddRole}
            searchTerm={searchTerm}
            handleMember={handleMember}
            handleEditMember={handleEditMember}
            registeredUpdated={registeredUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default TeamContent;
