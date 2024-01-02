import ThreadListJumbo from "./ThreadListJumbo";
import { useState } from "react";
import { motion } from "framer-motion";
import "../css/threads.css";
import { LinkIcon } from "../../../../utills/svgs/LinkIcon";
import { ThreeDotIcon } from "../../../../utills/svgs/ThreeDotIcon";
import { CommentIcon } from "../../../../utills/svgs/CommentIcon";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoader, setSideLoader } from "store/global/globalReducer";
import {
  addCommentThunk,
  addReplyThunk,
  getAllCommentsThunk,
  getAllThreadsThunk,
} from "store/workspace/workspaceThreads";
import { generateId } from "utills/uid";
import { formateDate, formateDateAndTime } from "utills/moment";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
} from "utills/globalVars";
import Cookies from "js-cookie";
import { EyeIcon } from "utills/svgs/EyeIcon";
import { ThreadsSkeleton } from "../threads-skeleton/ThreadsSkeleton";
import _ from "lodash";
import { toastHandler } from "responseHanlder";
import { WhiteBgTimes } from "utills/svgs/WhiteBgTimes";
import TruncateText from "global-components/StringSlicer";

const ThreadListPage = ({
  toggleMyNewThread,
  toggleStopThread,
  closeThreadHandler,
  threadsUpdated,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data: comments } = useSelector((state) => state.getAllComments);
  const { isLoading, sideLoader } = useSelector((state) => state.global);

  const [showThreadModal, setShowThreadModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [commentThreads, setCommentThreads] = useState([]);
  const [commentIndex, setCommentIndex] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [reply, setReply] = useState("");
  const toggleThreadModal = (index) => {
    setModalIndex(index);
    setShowThreadModal(!showThreadModal);
  };

  const toggleComments = (thread_id, index) => {
    setShowComments(!showComments);
    console.log(thread_id);
    setCommentIndex(index);

    if (showComments) {
      return;
    }
    const payload = {
      business_id,
      thread_id,
    };

    dispatch(getAllCommentsThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    dispatch(setLoader(true));
    const payload = {
      business_id,
    };
    dispatch(getAllThreadsThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setCommentThreads(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [dispatch, threadsUpdated]);

  const handleStopThread = (thread_id) => {
    closeThreadHandler(thread_id);
    toggleStopThread();
  };

  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentChange = (e, threadId) => {
    const newCommentInputs = { ...commentInputs };
    newCommentInputs[threadId] = e.target.value;
    setCommentInputs(newCommentInputs);
  };

  const handleComment = (thread_id) => {
    setShowComments(false);
    console.log(commentInputs[thread_id]);
    const text = commentInputs[thread_id];
    if (text === "") {
      toastHandler("Please write a comment", ERROR_TYPE_ERROR);
    }
    const payload = {
      business_id,
      thread_id,
      value: text,
    };
    dispatch(setSideLoader(true));
    dispatch(addCommentThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler("Commented added", ERROR_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  const replyHandler = (thread_comment_id, thread_id) => {
    if (!reply) {
      toastHandler("Please enter a reply", ERROR_TYPE_ERROR);
      return;
    }
    const payload = {
      business_id,
      thread_id,
      thread_comment_id,
      value: reply,
    };
    dispatch(addReplyThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler("Reply added", ERROR_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ThreadListJumbo toggleMyNewThread={toggleMyNewThread} />
      <div>
        <div>
          <div className="my-threads md:mx-10 mx-5 mt-2 text-black ">
            {isLoading ? (
              <ThreadsSkeleton />
            ) : (
              <div>
                {commentThreads &&
                  commentThreads?.map((thread, index) => (
                    <div key={index}>
                      <div className="my-thread shadow relative">
                        {showThreadModal && modalIndex === index ? (
                          <div className="thread-modal z-50 py-2  shadow">
                            <div
                              onClick={() =>
                                handleStopThread(thread?.thread_id)
                              }
                              className="flex gap-1 thread-modal-item py-1 px-2 items-center justify-center"
                            >
                              <div>
                                <WhiteBgTimes />
                              </div>
                              <div>Stop Thread</div>
                            </div>

                            {/* <div className="flex gap-1 thread-modal-item items-center mt-2 px-2 py-1">
                              <div>
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 21 21"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.42494 0.944923C8.05026 0.338556 8.89581 0 9.775 0C10.6542 0 11.4997 0.338556 12.1251 0.944923C12.6534 1.45721 12.9879 2.12549 13.0793 2.84091H18.5641C18.8216 2.84091 19.0711 2.94002 19.2568 3.12017C19.443 3.30072 19.55 3.54827 19.55 3.80909C19.55 4.06991 19.443 4.31746 19.2568 4.49802C19.0711 4.67816 18.8216 4.77727 18.5641 4.77727H17.6841L17.1032 9.65069L16.6576 9.53197C16.3025 9.43736 15.9391 9.37446 15.5721 9.34409L15.1588 9.30989L15.6994 4.77727H3.85157L5.18116 15.9549C5.23524 16.4078 5.45941 16.8284 5.8147 17.1353C6.1703 17.4424 6.63207 17.6137 7.11245 17.6136H9.54757L9.6601 17.8271C9.8606 18.2075 10.103 18.5639 10.381 18.891L10.9411 19.55H7.11247C6.1553 19.5499 5.22969 19.2088 4.51204 18.5885C3.79408 17.968 3.33404 17.1109 3.22312 16.1791L1.86588 4.77727H0.985937C0.728354 4.77727 0.478937 4.67816 0.293159 4.49802C0.106963 4.31746 0 4.06991 0 3.80909C0 3.54827 0.106963 3.30072 0.293159 3.12017C0.478937 2.94002 0.728354 2.84091 0.985937 2.84091H6.47075C6.56212 2.12549 6.89665 1.45721 7.42494 0.944923ZM9.775 1.93636C9.41098 1.93636 9.06426 2.0767 8.8105 2.32277C8.65845 2.47021 8.54724 2.64822 8.48262 2.84091H11.0674C11.0028 2.64822 10.8915 2.47021 10.7395 2.32277C10.4857 2.0767 10.139 1.93636 9.775 1.93636ZM18.9359 18.9354C19.8736 17.9978 20.4004 16.726 20.4004 15.3999C20.4004 14.0738 19.8736 12.8021 18.9359 11.8644C17.9982 10.9267 16.7265 10.3999 15.4004 10.3999C14.0743 10.3999 12.8025 10.9267 11.8649 11.8644C10.9272 12.8021 10.4004 14.0738 10.4004 15.3999C10.4004 16.726 10.9272 17.9978 11.8649 18.9354C12.8025 19.8731 14.0743 20.3999 15.4004 20.3999C16.7265 20.3999 17.9982 19.8731 18.9359 18.9354ZM17.6233 13.7332C17.6233 13.8808 17.5647 14.0223 17.4604 14.1266L16.1859 15.3999L17.4604 16.6732C17.512 16.7249 17.553 16.7862 17.581 16.8537C17.6089 16.9212 17.6233 16.9935 17.6233 17.0666C17.6233 17.1396 17.6089 17.212 17.581 17.2794C17.553 17.3469 17.512 17.4082 17.4604 17.4599C17.4087 17.5116 17.3474 17.5525 17.2799 17.5805C17.2124 17.6084 17.1401 17.6228 17.0671 17.6228C16.994 17.6228 16.9217 17.6084 16.8542 17.5805C16.7867 17.5525 16.7254 17.5116 16.6737 17.4599L15.4004 16.1855L14.1271 17.4599C14.0754 17.5116 14.0141 17.5525 13.9466 17.5805C13.8791 17.6084 13.8068 17.6228 13.7337 17.6228C13.6607 17.6228 13.5883 17.6084 13.5209 17.5805C13.4534 17.5525 13.392 17.5116 13.3404 17.4599C13.2887 17.4082 13.2478 17.3469 13.2198 17.2794C13.1919 17.212 13.1775 17.1396 13.1775 17.0666C13.1775 16.9935 13.1919 16.9212 13.2198 16.8537C13.2478 16.7862 13.2887 16.7249 13.3404 16.6732L14.6148 15.3999L13.3404 14.1266C13.2361 14.0223 13.1775 13.8808 13.1775 13.7332C13.1775 13.5857 13.2361 13.4442 13.3404 13.3399C13.4447 13.2356 13.5862 13.177 13.7337 13.177C13.8813 13.177 14.0227 13.2356 14.1271 13.3399L15.4004 14.6143L16.6737 13.3399C16.778 13.2356 16.9195 13.177 17.0671 13.177C17.2146 13.177 17.3561 13.2356 17.4604 13.3399C17.5647 13.4442 17.6233 13.5857 17.6233 13.7332Z"
                                  />
                                </svg>
                              </div>
                              <div>Delete</div>
                            </div> */}
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="my-thread-actions absolute right-5 top-3 flex items-center gap-4">
                          <div
                            onClick={() =>
                              navigate(
                                `/my/threads/details/${thread?.thread_id}`
                              )
                            }
                            className="cursor-pointer"
                          >
                            <EyeIcon />
                          </div>
                          <div
                            onClick={() => toggleThreadModal(index)}
                            className="cursor-pointer"
                          >
                            <ThreeDotIcon />
                          </div>
                        </div>

                        <div>
                          <div>
                            <div className="my-thread-image-wrapper">
                              <img
                                src={thread?.profile_image}
                                alt="thread"
                                className="my-thread-image"
                              />
                            </div>
                          </div>
                          <div className=" my-thread-content pl-2">
                            <div className="my-thread-name">
                              {thread?.created_by}
                            </div>
                            <div className="my-thread-date mt-1">
                              {formateDate(thread?.created_at)}
                            </div>
                            <div className="my-thread-title mt-1">
                              {thread?.title}
                            </div>
                            <div className="my-thread-description break-words mt-1">
                              <TruncateText
                                index={index}
                                text={thread?.description}
                                maxLength={10}
                              />
                            </div>
                          </div>
                        </div>
                        {thread?.attachments.length > 0 ? (
                          <div className="thread-download">
                            <div className="ann-btns  mt-2 flex gap-2">
                              {thread?.attachments.map((att, index) => (
                                <button
                                  className="flex px-3 py-1 items-center gap-1"
                                  key={index}
                                >
                                  {" "}
                                  <span>
                                    <LinkIcon />
                                  </span>{" "}
                                  <span>
                                    <a href={att.name}>{att.file_type}</a>
                                  </span>{" "}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <hr className="mt-3 " />
                        <div className="grid grid-cols-10 gap-2 mx-5 ">
                          <div className="md:col-span-9 col-span-8">
                            <div className="add-ann-form">
                              <input
                                type="text"
                                key={index}
                                placeholder="Comment"
                                onChange={(e) =>
                                  handleCommentChange(e, thread.thread_id)
                                }
                                maxLength={200}
                              />
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => handleComment(thread?.thread_id)}
                              className={`add-thread-btn px-2 py-2 mt-1 rounded-md ${
                                sideLoader && "animate-pulse"
                              }`}
                              disabled={sideLoader ? true : false}
                            >
                              comment
                            </button>
                          </div>
                        </div>

                        <hr className="mt-3" />

                        <div className="my-thread-comment-btns detail-comment-btn flex items-center justify-between p-2">
                          <div>
                            <button className="flex gap-1 items-center px-2 py-1">
                              {" "}
                              <span>
                                <CommentIcon />
                              </span>{" "}
                              <span>Comments</span>{" "}
                            </button>
                          </div>
                          <div className="pr-5">
                            {showComments ? (
                              <div>
                                <div
                                  onClick={() =>
                                    toggleComments(thread?.thread_id, index)
                                  }
                                  className="cursor-pointer"
                                >
                                  {" "}
                                  <svg
                                    width="13"
                                    height="8"
                                    viewBox="0 0 20 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M0.418419 0.402728C0.976311 -0.134243 1.88083 -0.134243 2.43872 0.402728L10 7.68046L17.5613 0.402728C18.1192 -0.134243 19.0237 -0.134243 19.5816 0.402728C20.1395 0.939699 20.1395 1.8103 19.5816 2.34727L11.0102 10.5973C10.4523 11.1342 9.54774 11.1342 8.98985 10.5973L0.418419 2.34727C-0.139473 1.8103 -0.139473 0.939699 0.418419 0.402728Z"
                                      fill="#979797"
                                    />
                                  </svg>{" "}
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  toggleComments(thread?.thread_id, index)
                                }
                                className="cursor-pointer"
                              >
                                {" "}
                                <svg
                                  width="6"
                                  height="13"
                                  viewBox="0 0 11 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M0.402728 19.5816C-0.134243 19.0237 -0.134243 18.1192 0.402728 17.5613L7.68046 10L0.402727 2.43872C-0.134244 1.88083 -0.134244 0.976311 0.402727 0.418419C0.939698 -0.139475 1.8103 -0.139475 2.34727 0.418419L10.5973 8.98985C11.1342 9.54774 11.1342 10.4523 10.5973 11.0102L2.34727 19.5816C1.8103 20.1395 0.939699 20.1395 0.402728 19.5816Z"
                                    fill="#979797"
                                  />
                                </svg>{" "}
                              </div>
                            )}
                          </div>
                        </div>

                        {comments && commentIndex === index && showComments ? (
                          <div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ type: "tween", duration: 0.5 }}
                            >
                              <hr />
                              {comments?.map((comment, index) => (
                                <div>
                                  <div
                                    className="thread-comment p-3"
                                    key={generateId()}
                                  >
                                    <div className="flex gap-2">
                                      <div>
                                        <div className="commentor-image-wrapper ">
                                          <img
                                            src="https://source.unsplash.com/user/c_v_r/1900x800"
                                            alt="commentor"
                                            className="commentor-image"
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <div className="commentor-name my-thread-name">
                                          {comment?.created_by}
                                        </div>
                                        <div className="commentor-date my-thread-date mt-1">
                                          {formateDateAndTime(
                                            comment?.created_at
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="my-thread-description mt-2">
                                      <div className="my-thread-description break-words mt-1">
                                        <TruncateText
                                          index={index}
                                          text={comment?.value}
                                          maxLength={10}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <hr className="mt-3" />
                                </div>
                              ))}
                            </motion.div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadListPage;
