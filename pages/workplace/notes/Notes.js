import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import NotesPage from "../../../components/workplace-content/notes-pages/NotesPage";
import AddNote from "../../../components/workplace-content/notes-pages/AddNote";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";
const Notes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [notesUpdated, setNotesUpdated] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddNote = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Notes?.admin ||
      allPermissions?.Notes?.write
    ) {
      setShowAddNote(!showAddNote);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  const toggleNotesUpdate = () => {
    console.log("update notes", ">>>>>>>>>");
    setNotesUpdated(!notesUpdated);
  };

  return (
    <div className="app-dashboard">
      {showAddNote && (
        <AddNote
          toggleNotesUpdate={toggleNotesUpdate}
          toggleAddNote={toggleAddNote}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        {allPermissions?.Notes?.read ||
        loginData.is_employee ||
        allPermissions?.Notes?.admin ? (
          <NotesPage
            toggleAddNote={toggleAddNote}
            notesUpdated={notesUpdated}
            toggleNotesUpdate={toggleNotesUpdate}
          />
        ) : (
          <div className="w-full h-72 flex justify-center items-center font-poppins">
            {PERMISSIONS_MESSAGE}
          </div>
        )}
      </div>
    </div>
  );
};
export default Notes;
