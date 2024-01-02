import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSingleCommentFileThunk,
  updateActivityThunk,
} from "store/workspace/workspaceTasks";
import { USER_TYPE } from "utills/globalVars";
import { AttachmentIcon } from "utills/svgs/AttachmentIcon";
import { WhiteBgTimes } from "utills/svgs/WhiteBgTimes";

export const ReplyEditor = ({ child, setShowEditReply, fetchActivity }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [updateReplyLoader, setUpdateReplyLoader] = useState(false);
  const [fileDelLoader, setFileDelLoader] = useState(false);
  const [delIndex, setDelIndex] = useState(null);
  const handleFileSelect = (e) => {
    const newfiles = e.target.files;

    setUploadFiles([...newfiles]);
  };

  const handleDeleteFile = (task_activity_file_id, index) => {
    setDelIndex(index);
    const payload = {
      task_activity_file_id,
    };
    setFileDelLoader(true);
    dispatch(deleteSingleCommentFileThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setShowEditReply(false);
          fetchActivity();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFileDelLoader(false);
      });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("uploaded_by", USER_TYPE);
    formData.append("task_activity_id", child.task_activity_id);
    formData.append("comment", input);

    if (uploadFiles) {
      uploadFiles.forEach((file, index) => {
        formData.append("task_activity_docs", file);
      });
    }
    setUpdateReplyLoader(true);
    dispatch(updateActivityThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          fetchActivity();
          setShowEditReply(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUpdateReplyLoader(false);
      });
  };

  useEffect(() => {
    setInput(child.comment);
    if (child.files.length > 0) {
      setFiles(child.files);
    }
  }, []);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-1"></div>
      <div className="comment-modal mt-2 col-span-9">
        <div className="add-ann-form mb-2">
          <label>Edit Reply</label>
        </div>
        <div className="task-comment-input-container">
          <input
            type="text"
            className="task-comment-input"
            placeholder="Write a comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
                  className={` cursor-pointer ${
                    fileDelLoader && delIndex === index ? "animate-spin " : ""
                  }`}
                  onClick={() =>
                    handleDeleteFile(file?.task_activity_file_id, index)
                  }
                >
                  <span>
                    {" "}
                    <WhiteBgTimes />
                  </span>
                </span>
              </button>
            ))}
        </div>

        <hr className="my-2"></hr>
        <div className="mt-2 flex items-center justify-between gap-3">
          <button
            className="edit-cancel-btn px-3 py-2"
            onClick={() => setShowEditReply(false)}
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            disabled={updateReplyLoader ? true : false}
            onClick={handleSubmit}
            className="ann-btn px-3 py-2 rounded-lg mt-1 flex items-center gap-2"
          >
            {updateReplyLoader ? <SmallLoaderWhite /> : "Update"}
          </button>{" "}
        </div>
      </div>
    </div>
  );
};
