import "./css/people.css";
import PeopleJumbo from "./PeopleJumbo";
import PeopleOperations from "./PeopleOperations";
import PeopleTable from "./PeopleTable";
const PeoplePage = ({ toggleInviteEmployee, toggleEmploymentDetails }) => {
  return (
    <div>
      <PeopleJumbo toggleInviteEmployee={toggleInviteEmployee} />
      <div>
        <PeopleOperations />
      </div>
      <div>
        <PeopleTable toggleEmploymentDetails={toggleEmploymentDetails} />
      </div>
    </div>
  );
};

export default PeoplePage;
