import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { deleteNoteThunk } from "store/workspace/workspaceNotes";
import ConfirmationModal from "utills/confirmationModal";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  PERMISSIONS_MESSAGE,
} from "utills/globalVars";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";

import { LinkIcon } from "utills/svgs/LinkIcon";
import { generateId } from "utills/uid";

const NotesList = ({ toggleNotesUpdate, filteredNotes }) => {
  const dispatch = useDispatch();

  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data } = useSelector((state) => state.getAllNotes);
  const [deleteId, setDeleteId] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  const deleteNote = (business_note_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Notes?.admin ||
      allPermissions?.Notes?.write
    ) {
      setDeleteId(business_note_id);
      setIsConfirmationOpen(true);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  const handleDelete = () => {
    setIsConfirmationOpen(false);
    const payload = {
      business_id,
      business_note_id: deleteId,
    };
    dispatch(deleteNoteThunk(payload))
      .then((response) => {
        if (response.payload) {
          toggleNotesUpdate();
        }
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="md:px-10 px-5 mt-5">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className=" ">
        {filteredNotes &&
          filteredNotes?.map((note, index) => (
            <div
              key={generateId()}
              className="note-wrapper shadow relative mb-5"
            >
              <div className="note-actions absolute flex gap-2 right-5">
                {/* <div>
                  <EyeIcon />
                </div>
                <div>
                  <BgEditIcon />
                </div> */}
                <div
                  className="cursor-pointer"
                  onClick={() => deleteNote(note.business_note_id)}
                >
                  <BgDeleteIcon />
                </div>
              </div>
              <div className="note-title">{note.title}</div>
              <div className="note-body mt-2">
                <MyComponent htmlContent={note?.description} />
              </div>
              <div className="note-btns mt-2">
                {note.attachment.length > 0 && (
                  <div>
                    <div className="ann-btns mt-2 flex gap-2">
                      {note?.attachment?.map((att, index) => (
                        <button
                          className="flex px-3 py-1 items-center gap-1"
                          key={generateId()}
                        >
                          {" "}
                          <span>
                            <LinkIcon />
                          </span>{" "}
                          <span>
                            {" "}
                            <a href={att?.name}>
                              {att?.file_type.slice(0, 10)}
                            </a>{" "}
                          </span>{" "}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default NotesList;
