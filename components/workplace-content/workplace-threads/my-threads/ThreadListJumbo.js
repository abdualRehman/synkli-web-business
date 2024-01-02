import { MessagesIcon } from "utills/svgs/MessagesIcon";
import "../css/threads.css";
const ThreadListJumbo = ({ toggleMyNewThread }) => {
  return (
    <div className="profle-jumbo ann-jumbo  app-jumbo  md:mx-10 mx-5 py-5  ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="jumbo-name">Threads</div>
          <div className="jumbo-dir mt-2">
            Workspace <span className="special-jumbo-text">&gt; Threads</span>
          </div>
        </div>
      </div>

      <button
        onClick={toggleMyNewThread}
        className="flex absolute right-5 top-16 add-thread-btn items-center px-2 py-2 gap-2 rounded-md "
      >
        {" "}
        <span>
          <MessagesIcon />
        </span>{" "}
        <span>Create New Thread</span>{" "}
      </button>
    </div>
  );
};

export default ThreadListJumbo;
