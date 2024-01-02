import { MessagesIcon } from "../../../../utills/svgs/MessagesIcon";

const MyThreadsJumbo = ({ toggleMyNewThread }) => {
  return (
    <div className="profle-jumbo ann-jumbo  app-jumbo  md:flex md:flex-row flex-col  md:mx-10 mx-5 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="jumbo-name">My Threads</div>
          <div className="jumbo-dir mt-2">
            Workspace{" "}
            <span className="special-jumbo-text">&gt; My Threads</span>
          </div>
        </div>
      </div>
      <div className="apps-jumbo-btns flex flex-col md:flex-row gap-3">
        <button
          onClick={toggleMyNewThread}
          className="flex gap-2  items-center add-app-btn"
        >
          {" "}
          <span>
            <MessagesIcon />
          </span>{" "}
          <span className="flex">Create New Thread</span>{" "}
        </button>
      </div>
    </div>
  );
};

export default MyThreadsJumbo;
