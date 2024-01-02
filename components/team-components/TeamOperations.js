import { CallBurger } from "utills/svgs/CallBurger";
import { SearchIcon } from "../../utills/svgs/SearchIcon";
import "./css/team.css";
import { useState } from "react";

const TeamOperations = ({ changeTeam, toggleAddTeam, searchByname }) => {
  const [operationToggle, setOperationToggle] = useState(false);

  function toggleOperation() {
    setOperationToggle(!operationToggle);
    changeTeam();
  }

  return (
    <div>
      <div className="md:px-10 px-5 mt-3 relative">
        <div className="flex justify-between flex-wrap items-center gap-5">
          <div className="search-team">
            <div>
              <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <SearchIcon />
              </div>
              <div>
                <input
                  type="text"
                  onChange={(e) => searchByname(e.target.value)}
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="team-toggle  ">
              <button
                onClick={toggleOperation}
                className={`px-12 cursor-pointer  ${
                  !operationToggle ? "toggle-blue" : "t-t-btn"
                }`}
              >
                invited
              </button>
              <button
                onClick={toggleOperation}
                className={`  px-9  cursor-pointer ${
                  operationToggle ? "toggle-blue" : "t-t-btn"
                }`}
              >
                Registered
              </button>
            </div>
          </div>
          <div>
            <div
              onClick={toggleAddTeam}
              className="team-invite cursor-pointer flex gap-2 items-center "
            >
              <div>
                <CallBurger />
              </div>
              <div>Invite Team Member</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOperations;
