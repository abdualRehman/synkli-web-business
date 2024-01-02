import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toastHandler } from "responseHanlder";
import { createTaskCommentThunk } from "store/workspace/workspaceTasks";
import { TOAST_TYPE_ERROR, USER_TYPE } from "utills/globalVars";
import { AttachmentIcon } from "utills/svgs/AttachmentIcon";

export const ReplyBox = ({
  task_activity_id,
  task,
  fetchActivity,
  setShowReplyBox,
}) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const [files, setFiles] = useState([]);
  const [replyLoader, setReplyLoader] = useState(false);
  const handleFileSelect = (e) => {
    const newfiles = e.target.files;
    const newArr = [...files, ...newfiles];
    setFiles(newArr);
  };

  const handleSubmit = () => {
    if (!reply) {
      toastHandler("Please fill in all required fields", TOAST_TYPE_ERROR);
      return;
    }
    const formData = new FormData();
    formData.append("uploaded_by", USER_TYPE);
    formData.append("task_id", task?.task_id);
    formData.append("comment", reply);
    formData.append("parent_task_activity_id", task_activity_id);
    if (files) {
      files.forEach((file) => {
        formData.append("task_activity_docs", file);
      });
    }

    setReplyLoader(true);
    dispatch(createTaskCommentThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          fetchActivity();
          setShowReplyBox(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setReplyLoader(false);
      });
  };

  return (
    <div className="grid grid-cols-12 gap-3 mt-2">
      <div className="col-span-1"></div>
      <div className="reply-modal col-span-9 flex items-center gap-2 ">
        {" "}
        <div className="task-comment-input-container">
          <input
            type="text"
            className="task-comment-input"
            placeholder="Write a reply"
            onChange={(e) => setReply(e.target.value)}
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
        <div>
          <button
            onClick={handleSubmit}
            disabled={replyLoader ? true : false}
            className="ann-btn px-5 py-2 rounded-sm "
          >
            {replyLoader ? <SmallLoaderWhite /> : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};
