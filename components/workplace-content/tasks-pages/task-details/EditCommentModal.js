import React, { useEffect, useState } from "react";
import "./css/taskDetail.css";
import { AttachmentIcon } from "utills/svgs/AttachmentIcon";
import { WhiteBgTimes } from "utills/svgs/WhiteBgTimes";
import { useDispatch } from "react-redux";
import {
  deleteSingleCommentFileThunk,
  updateActivityThunk,
} from "store/workspace/workspaceTasks";
import { USER_TYPE } from "utills/globalVars";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";

export const EditCommentModal = ({
  updateComment,
  fetchActivity,
  setShowEditComment,
  setEditIndex,
  index,
}) => {
  const dispatch = useDispatch();
  const [updateInput, setupdateInput] = useState("");
  const [files, setFiles] = useState([]);
  const [editLoader, setEditLoader] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [fileDeleteLoader, setFileDeleteLoader] = useState(false);

  const handleFileSelect = (e) => {
    const newfiles = e.target.files;
    const newArr = [...updateComment.files, ...newfiles];
    setUploadFiles(newArr);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("uploaded_by", USER_TYPE);
    formData.append("task_activity_id", updateComment.task_activity_id);
    formData.append("comment", updateInput);
    if (uploadFiles) {
      uploadFiles.forEach((file, index) => {
        formData.append("task_activity_docs", file);
      });
    }
    setEditLoader(true);
    dispatch(updateActivityThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          fetchActivity();
          setShowEditComment(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setEditLoader(false);
      });
  };
  const handleDeleteFile = (task_activity_file_id, index) => {
    setDeleteIndex(index);
    const payload = {
      task_activity_file_id,
    };
    setFileDeleteLoader(true);
    dispatch(deleteSingleCommentFileThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setShowEditComment(false);

          fetchActivity();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFileDeleteLoader(false);
      });
  };

  useEffect(() => {
    setupdateInput(updateComment?.comment);
    if (updateComment.files.length > 0) {
      setFiles(updateComment?.files);
    }
  }, []);
  return (
    <div className="comment-modal mt-2">
      <div className="add-ann-form mb-2">
        <label>Edit Comment</label>
      </div>
      <div className="task-comment-input-container">
        <input
          type="text"
          className="task-comment-input"
          placeholder="Write a comment"
          value={updateInput}
          onChange={(e) => setupdateInput(e.target.value)}
        />
        <div className="task-comment-attachment-icon cursor-pointer">
          <label htmlFor="update-files">
            <div className="cursor-pointer">
              <AttachmentIcon />
            </div>
          </label>
          <input
            id="update-files"
            type="file"
            accept=".doc, .docx, .pdf, .jpg, .jpeg, .png, .heic"
            multiple
            onChange={(e) => handleFileSelect(e)}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {" "}
        {files?.length > 0 &&
          files?.map((file, index) => (
            <button
              key={index}
              className="files-btn flex gap-2 items-center mt-2"
            >
              {file.url.slice(0, 7)}
              <span
                className={`cursor-pointer ${
                  fileDeleteLoader && deleteIndex === index
                    ? "animate-spin"
                    : ""
                }`}
                onClick={() =>
                  handleDeleteFile(file?.task_activity_file_id, index)
                }
              >
                <WhiteBgTimes />
              </span>
            </button>
          ))}
      </div>

      <hr className="my-2"></hr>
      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          className="edit-cancel-btn px-3 py-2"
          onClick={() => setShowEditComment(false)}
        >
          {" "}
          Cancel{" "}
        </button>{" "}
        <button
          onClick={handleSubmit}
          className="ann-btn px-3 py-2 rounded-lg mt-1 flex items-center gap-2"
        >
          {editLoader ? <SmallLoaderWhite /> : "Update"}
        </button>{" "}
      </div>
    </div>
  );
};
