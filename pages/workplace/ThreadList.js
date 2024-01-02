import { useState } from "react";
import AppSidebar from "../../components/appSidebarComp/AppSidebar";
import "../../components/appSidebarComp/appSidebar.css";
import ThreadListPage from "../../components/workplace-content/workplace-threads/my-threads/ThreadsListPage";
import MyNewThread from "../../components/workplace-content/workplace-threads/my-threads/MyNewThread";
import StopThread from "../../components/workplace-content/workplace-threads/my-threads/StopThread";
const ThreadList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showMyNewThread, setShowMyNewThread] = useState(false);
  const [showStopThread, setShowStopThread] = useState(false);
  const [threadsUpdated, setThreadsUpdated] = useState(false)
  const [threadId, setThreadId] = useState(null)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMyNewThread = () => {
    setShowMyNewThread(!showMyNewThread);
  };

  function toggleStopThread() {
    setShowStopThread(!showStopThread);
  }
  const closeThreadHandler = (id) => {
    setThreadId(id)
  }

  const toggleThreadUpdate = () => {
    setThreadsUpdated(!threadsUpdated)
  }

  return (
    <div className="app-dashboard">
      {showMyNewThread && <MyNewThread toggleMyNewThread={toggleMyNewThread} toggleThreadUpdate={toggleThreadUpdate}/>}
      {showStopThread && <StopThread toggleStopThread={toggleStopThread} threadId={threadId} toggleThreadUpdate={toggleThreadUpdate} />}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <ThreadListPage
          toggleStopThread={toggleStopThread}
          toggleMyNewThread={toggleMyNewThread}
          closeThreadHandler={closeThreadHandler}
          threadsUpdated={threadsUpdated}
        />
      </div>
    </div>
  );
};

export default ThreadList;
