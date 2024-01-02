import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import {
  createTaskCommentThunk,
  deleteActivityThunk,
} from "store/workspace/workspaceTasks";
import { TOAST_TYPE_ERROR, USER_TYPE } from "utills/globalVars";
import { bitsToMegabytes } from "utills/moment";
import { AttachmentIcon } from "utills/svgs/AttachmentIcon";
import { PhotoIconWhite } from "utills/svgs/PhotoIconWhite";
import { generateId } from "utills/uid";
import { EditCommentModal } from "./EditCommentModal";
import { ReplyBox } from "./ReplyBox";
import { ReplyEditor } from "./ReplyEditor";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";

const Activity = ({ task, fetchActivity }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const [activityLoader, setActivityLoader] = useState(false);
  const { data: taskComments } = useSelector((state) => state.getActivity);

  const [editComment, setEditComment] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showEditComment, setShowEditComment] = useState(false);
  const { profileImg } = useSelector((state) => state.global);
  const handleFilesChange = (e) => {
    const newfiles = e.target.files;
    setFiles([...files, ...newfiles]);
  };

  const handleSubmit = () => {
    if (!comment) {
      toastHandler("Please fill in all required fields", TOAST_TYPE_ERROR);
      return;
    }
    const formData = new FormData();
    formData.append("uploaded_by", USER_TYPE);
    formData.append("task_id", task?.task_id);
    formData.append("comment", comment);

    if (files) {
      files.forEach((file) => {
        formData.append("task_activity_docs", file);
      });
    }

    setActivityLoader(true);
    dispatch(createTaskCommentThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          fetchActivity();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setComment("");
        setActivityLoader(false);
      });
  };

  const [commentLoader, setCommentLoader] = useState(false);

  const deleteComment = (task_activity_id) => {
    const payload = {
      task_activity_id,
    };
    setCommentLoader(true);
    dispatch(deleteActivityThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setComment("");
          setFiles([]);
          fetchActivity();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCommentLoader(false);
      });
  };

  const [updateComment, setUpdateComment] = useState(null);
  const handleShowCommentModal = (comment, index) => {
    setShowReplyBox(false);
    setUpdateComment(comment);
    setEditIndex(index);
    setShowEditComment(!showEditComment);
  };

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyIndex, setReplyIndex] = useState(null);

  const handleReplyBox = (index) => {
    setShowEditComment(false);
    setShowReplyBox(!showReplyBox);
    setReplyIndex(index);
  };

  const [showEditReply, setShowEditReply] = useState("");
  const [editReplyIndex, setEditReplyIndex] = useState(null);

  const toggleEditReply = (index) => {
    setEditReplyIndex(index);
    setShowEditReply(!showEditReply);
  };
  return (
    <div>
      <div className="task-detail-main-card activities-container text-black  mt-5 p-5 rounded-md relative">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center add-ann-form">
            <div>
              <label>Activity</label>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-12 mt-3 gap-3">
            <div className="col-span-1 ">
              {profileImg ? (
                <div className="task-user-profile-container">
                  <img
                    src={profileImg}
                    alt="profile"
                    className="task-user-img"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  {" "}
                  <DefaultUserIcon />{" "}
                </div>
              )}
            </div>
            <input
              id="fil-input"
              type="file"
              multiple
              onChange={(e) => handleFilesChange(e)}
              style={{ display: "none" }}
            />
            <div className="col-span-9  md:ml-0 ml-2 flex items-center justify-center">
              <div className="task-comment-input-container">
                <input
                  type="text"
                  value={comment}
                  className="task-comment-input "
                  placeholder="Write a comment"
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="task-comment-attachment-icon cursor-pointer">
                  <label htmlFor="fil-input">
                    <div className="cursor-pointer">
                      <AttachmentIcon />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-span-1 ">
              <button
                disabled={activityLoader ? true : false}
                onClick={handleSubmit}
                className="ann-btn px-5 py-2 rounded-sm "
              >
                {activityLoader ? <SmallLoaderWhite /> : "Post"}
              </button>
            </div>
          </div>

          {taskComments?.map((cm, index) => (
            <div key={generateId()}>
              <div className="mt-5">
                <div className="grid grid-cols-12 gap-3">
                  <div className=" col-span-1">
                    {cm?.commented_by?.image ? (
                      <div className="task-user-profile-container">
                        <img
                          src={cm?.commented_by?.image}
                          alt="no data"
                          className="task-user-img"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        {" "}
                        <DefaultUserIcon />{" "}
                      </div>
                    )}
                  </div>
                  <div className="col-span-9 add-ann-form">
                    <div>
                      <label>
                        {cm?.commented_by?.first_name}{" "}
                        {cm?.commented_by?.last_name}
                      </label>
                    </div>
                    <div className="task-comment-data">
                      <div className="grid grid-cols-12 gap-3">
                        {cm?.files?.length > 0 &&
                          cm?.files.map((file, fileIndex) => (
                            <div className="comment-info-container col-span-4">
                              <a
                                href={file?.url}
                                className="comment-file-container flex items-center gap-2 p-2 rounded-md"
                              >
                                <div>
                                  <PhotoIconWhite />
                                </div>
                                <div>
                                  <div className="comment-file-name ">
                                    {file?.name.slice(0, 10)}
                                  </div>
                                  <div className="comment-file-size">
                                    {bitsToMegabytes(file?.size)} mb
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                      </div>
                      <div className="task-comment-text my-2 ">
                        {cm.comment}
                      </div>
                    </div>
                    <div className="mt-2 att-actions flex justify-between items-center ">
                      <div>
                        <div className="att-actions flex items-center gap-2">
                          <span
                            className="cursor-pointer underline"
                            onClick={() => handleReplyBox(index)}
                          >
                            Reply
                          </span>
                          <span
                            className="cursor-pointer underline"
                            onClick={() => handleShowCommentModal(cm, index)}
                          >
                            Edit
                          </span>
                          <span
                            className="cursor-pointer underline"
                            onClick={() => deleteComment(cm?.task_activity_id)}
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                      <div>{cm?.created_at}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1"> </div>
                <div className="col-span-9">
                  {showEditComment && editIndex === index ? (
                    <EditCommentModal
                      index={index}
                      updateComment={updateComment}
                      fetchActivity={fetchActivity}
                      setShowEditComment={setShowEditComment}
                      setEditIndex={setEditIndex}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {showReplyBox && replyIndex === index ? (
                <ReplyBox
                  task_activity_id={cm.task_activity_id}
                  task={task}
                  fetchActivity={fetchActivity}
                  setShowReplyBox={setShowReplyBox}
                />
              ) : (
                ""
              )}

              {cm?.childs.length > 0 &&
                cm?.childs?.map((child, childIndex) => (
                  <div className="mt-5 ml-10">
                    <div className="grid grid-cols-12 gap-3">
                      <div className=" col-span-1">
                        {child?.commented_by?.image ? (
                          <div className="task-user-profile-container">
                            <img
                              src={child?.commented_by?.image}
                              alt="profile"
                              className="task-user-img scale-75"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center items-center">
                            {" "}
                            <DefaultUserIcon />{" "}
                          </div>
                        )}
                      </div>
                      <div className="col-span-9 add-ann-form">
                        <div>
                          <label>
                            {child?.commented_by?.first_name}{" "}
                            {child?.commented_by?.last_name}
                          </label>
                        </div>
                        <div className="task-comment-data">
                          <div className="grid grid-cols-12 gap-3">
                            {child?.files?.length > 0 &&
                              child?.files.map((file, fileIndex) => (
                                <div className="comment-info-container col-span-4">
                                  <a
                                    href={file?.url}
                                    className="comment-file-container flex items-center gap-2 p-2 rounded-md"
                                  >
                                    <div>
                                      <PhotoIconWhite />
                                    </div>
                                    <div>
                                      <div className="comment-file-name">
                                        {file?.name.slice(0, 7)}
                                      </div>
                                      <div className="comment-file-size">
                                        {bitsToMegabytes(file?.size)} mb
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              ))}
                          </div>
                          <div className="task-comment-text my-2 ">
                            {child.comment}
                          </div>
                        </div>
                        <div className="mt-2 att-actions flex justify-between items-center ">
                          <div>
                            <div className="att-actions flex items-center gap-2">
                              <span
                                className="cursor-pointer underline"
                                onClick={() => toggleEditReply(childIndex)}
                              >
                                Edit
                              </span>
                              <span
                                className="cursor-pointer underline"
                                onClick={() =>
                                  deleteComment(child?.task_activity_id)
                                }
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                          <div>{child?.created_at}</div>
                        </div>
                      </div>
                    </div>
                    {showEditReply && editReplyIndex === childIndex ? (
                      <ReplyEditor
                        child={child}
                        setShowEditReply={setShowEditReply}
                        fetchActivity={fetchActivity}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
