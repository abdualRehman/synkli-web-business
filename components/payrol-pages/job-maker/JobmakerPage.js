import JobmakerJumbo from "./JobmakerJumbo";
import JobmakerOperations from "./JobmakerOperations";
import NoEmployee from "./NoEmployee";
const JobmakerPage = () => {
  return (
    <div>
      <JobmakerJumbo />
      <div>
        <JobmakerOperations />
      </div>
      <div>
        <NoEmployee />
      </div>
    </div>
  );
};

export default JobmakerPage;
