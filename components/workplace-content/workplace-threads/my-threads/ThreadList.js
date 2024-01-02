import TruncateText from "global-components/StringSlicer";
import React from "react";

export const ThreadList = () => {
  return (
    <div>
      <div>
        <div className="my-threads md:px-10 mt-2 ">
          {isLoading ? (
            <ThreadsSkeleton />
          ) : (
            <div>
              {commentThreads &&
                commentThreads?.map((thread, index) => (
                  <div key={generateId()}>
                    <div className="my-thread shadow relative">
                      {showThreadModal && modalIndex === index ? (
                        <div className="thread-modal z-50 py-2  shadow">
                          <div
                            onClick={() => handleStopThread(thread?.thread_id)}
                            className="flex gap-1 thread-modal-item py-1 px-2 items-center justify-center"
                          >
                            <div></div>
                            <div>Stop Thread</div>
                          </div>

                          <div className="flex gap-1 thread-modal-item items-center mt-2 pl-2 py-1">
                            <div></div>
                            <div>Delete</div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="my-thread-actions absolute right-5 top-3 flex items-center gap-4">
                        <div
                          onClick={() =>
                            navigate(`/my/threads/details/${thread?.thread_id}`)
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
                          <div className="my-thread-name">{thread?.title}</div>
                          <div className="my-thread-date mt-1">
                            {formateDateAndTime(thread?.created_at)}
                          </div>
                          <div className="my-thread-title mt-1"></div>
                          <div className="my-thread-description break-words mt-1">
                            <TruncateText
                              index={index}
                              text={thread?.description}
                              maxLength={100}
                            />
                          </div>
                        </div>
                        <hr className="mt-3 " />
                        <div className="grid grid-cols-10 gap-2 mx-5 ">
                          <div className="col-span-9">
                            <div className="add-ann-form">
                              <input
                                type="text"
                                key={index}
                                placeholder="Comment"
                                onChange={(e) =>
                                  handleCommentChange(e, thread.thread_id)
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => handleComment(thread?.thread_id)}
                              className="add-thread-btn px-2 py-2 mt-1 rounded-md"
                            >
                              comment
                            </button>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-3" />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

<div>
  <div>
    <div className="my-threads md:px-10 mt-2 ">
      {isLoading ? (
        <ThreadsSkeleton />
      ) : (
        <div>
          {commentThreads &&
            commentThreads?.map((thread, index) => (
              <div key={generateId()}>
                <div className="my-thread shadow relative">
                  {showThreadModal && modalIndex === index ? (
                    <div className="thread-modal z-50 py-2  shadow">
                      <div
                        onClick={() => handleStopThread(thread?.thread_id)}
                        className="flex gap-1 thread-modal-item py-1 px-2 items-center justify-center"
                      >
                        <div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.25 10C19.25 12.4533 18.2754 14.806 16.5407 16.5407C14.806 18.2754 12.4533 19.25 10 19.25C7.54675 19.25 5.19397 18.2754 3.45926 16.5407C1.72455 14.806 0.75 12.4533 0.75 10C0.75 7.54675 1.72455 5.19397 3.45926 3.45926C5.19397 1.72455 7.54675 0.75 10 0.75C12.4533 0.75 14.806 1.72455 16.5407 3.45926C18.2754 5.19397 19.25 7.54675 19.25 10Z"
                              stroke="white"
                              stroke-width="1.5"
                            />
                            <path
                              d="M13.7068 7.70872C13.8945 7.52101 14 7.26641 14 7.00095C14 6.73548 13.8945 6.48088 13.7068 6.29317C13.5191 6.10546 13.2645 6 12.9991 6C12.7336 6 12.479 6.10546 12.2913 6.29317L10 8.58645L7.70872 6.29317C7.52101 6.10546 7.26641 6 7.00095 6C6.73548 6 6.48088 6.10546 6.29317 6.29317C6.10546 6.48088 6 6.73548 6 7.00095C6 7.26641 6.10546 7.52101 6.29317 7.70872L8.58645 10L6.29317 12.2913C6.20022 12.3842 6.12649 12.4946 6.07619 12.616C6.02589 12.7374 6 12.8676 6 12.9991C6 13.1305 6.02589 13.2607 6.07619 13.3821C6.12649 13.5035 6.20022 13.6139 6.29317 13.7068C6.38612 13.7998 6.49646 13.8735 6.6179 13.9238C6.73934 13.9741 6.8695 14 7.00095 14C7.13239 14 7.26255 13.9741 7.38399 13.9238C7.50543 13.8735 7.61578 13.7998 7.70872 13.7068L10 11.4136L12.2913 13.7068C12.3842 13.7998 12.4946 13.8735 12.616 13.9238C12.7374 13.9741 12.8676 14 12.9991 14C13.1305 14 13.2607 13.9741 13.3821 13.9238C13.5035 13.8735 13.6139 13.7998 13.7068 13.7068C13.7998 13.6139 13.8735 13.5035 13.9238 13.3821C13.9741 13.2607 14 13.1305 14 12.9991C14 12.8676 13.9741 12.7374 13.9238 12.616C13.8735 12.4946 13.7998 12.3842 13.7068 12.2913L11.4136 10L13.7068 7.70872Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <div>Stop Thread</div>
                      </div>

                      <div className="flex gap-1 thread-modal-item items-center mt-2 pl-2 py-1">
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
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="my-thread-actions absolute right-5 top-3 flex items-center gap-4">
                    <div
                      onClick={() =>
                        navigate(`/my/threads/details/${thread?.thread_id}`)
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
                          src="https://source.unsplash.com/user/c_v_r/1900x800"
                          alt="thread"
                          className="my-thread-image"
                        />
                      </div>
                    </div>
                    <div className=" my-thread-content pl-2">
                      <div className="my-thread-name">{thread?.title}</div>
                      <div className="my-thread-date mt-1">
                        {formateDateAndTime(thread?.created_at)}
                      </div>
                      <div className="my-thread-title mt-1"></div>
                      <div className="my-thread-description mt-1">
                        {thread?.description}
                      </div>
                    </div>
                  </div>

                  {/* <div className="thread-download">
        <div className="ann-btns  mt-2 flex gap-2">
          <button className="flex px-3 py-1 items-center gap-1">
            {" "}
            <span>
              <LinkIcon />
            </span>{" "}
            <span>Image.png</span>{" "}
          </button>

          <button className="flex px-3 py-1 items-center gap-1">
            {" "}
            <span>
              <LinkIcon />
            </span>{" "}
            <span>document.pdf</span>{" "}
          </button>
        </div>
      </div> */}
                  <hr className="mt-3 " />
                  <div className="grid grid-cols-10 gap-2 mx-5 ">
                    <div className="col-span-9">
                      <div className="add-ann-form">
                        <input
                          type="text"
                          key={index}
                          placeholder="Comment"
                          onChange={(e) =>
                            handleCommentChange(e, thread.thread_id)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleComment(thread?.thread_id)}
                        className="add-thread-btn px-2 py-2 mt-1 rounded-md"
                      >
                        comment
                      </button>
                    </div>
                  </div>

                  <hr className="mt-3" />
                  {/* 
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
                          {comment?.value}
                        </div>

                        <div>
                          <div className="ann-btns mt-2 flex gap-2">
                            <button className="flex px-3 py-1 items-center gap-1">
                              {" "}
                              <span>
                                <LinkIcon />
                              </span>{" "}
                              <span>Image.png</span>{" "}
                            </button>

                            <button className="flex px-3 py-1 items-center gap-1">
                              {" "}
                              <span>
                                <LinkIcon />
                              </span>{" "}
                              <span>document.pdf</span>{" "}
                            </button>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-3" />
                      <div className="comment-reply-container ml-5 mt-3">
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-10">
                            <div className="reply-input-wrapper">
                              <div className="reply-file-icon">
                                <svg
                                  width="25"
                                  height="25"
                                  viewBox="0 0 26 26"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    opacity="0.22"
                                    d="M26 13C26 5.82034 20.1797 5.09014e-05 13 3.27913e-05C5.82033 1.46812e-05 5.08828e-07 5.82031 1.1365e-06 13C1.76417e-06 20.1797 5.82031 26 13 26C20.1797 26 26 20.1797 26 13Z"
                                    fill="#B695F8"
                                  />
                                  <path
                                    d="M15.9 5C16.8927 4.99993 17.8639 5.28958 18.6943 5.83341C19.5248 6.37724 20.1784 7.15161 20.5751 8.06155C20.9718 8.97148 21.0943 9.9774 20.9275 10.9559C20.7608 11.9345 20.312 12.843 19.6363 13.5702L19.4748 13.7351L12.0575 21.1521L12.0125 21.1946L11.9649 21.2328C11.3606 21.7537 10.5819 22.027 9.78464 21.9979C8.98741 21.9688 8.23062 21.6396 7.66593 21.0761C7.10124 20.5126 6.77037 19.7565 6.73963 18.9594C6.70889 18.1623 6.98056 17.383 7.50018 16.7777L7.62682 16.6383L7.63957 16.629L13.8356 10.4214C13.9948 10.2618 14.211 10.172 14.4364 10.1718C14.6619 10.1716 14.8782 10.2609 15.0378 10.4201C15.1974 10.5794 15.2872 10.7955 15.2874 11.021C15.2877 11.2464 15.1983 11.4627 15.0391 11.6223L8.84307 17.8299L8.83287 17.8367C8.5828 18.1037 8.44188 18.4548 8.43792 18.8206C8.43396 19.1864 8.56724 19.5405 8.81148 19.8128C9.05572 20.0852 9.39317 20.2562 9.75728 20.2921C10.1214 20.3279 10.4857 20.226 10.7784 20.0064L10.8821 19.9214L10.8829 19.9223L18.279 12.5283L18.4141 12.3881C19.0092 11.734 19.326 10.8739 19.2974 9.99019C19.2687 9.10647 18.8969 8.26867 18.2607 7.65455C17.6246 7.04044 16.7741 6.69832 15.8899 6.70079C15.0057 6.70327 14.1572 7.05013 13.5245 7.66779L13.3927 7.80378L13.3774 7.81397L5.451 15.7434C5.37204 15.8223 5.2783 15.8849 5.17514 15.9276C5.07199 15.9703 4.96144 15.9922 4.8498 15.9922C4.73816 15.9921 4.62763 15.9701 4.5245 15.9273C4.42138 15.8846 4.32769 15.8219 4.24878 15.743C4.16987 15.664 4.10728 15.5703 4.0646 15.4671C4.02191 15.364 3.99996 15.2534 4 15.1418C4.00008 14.9164 4.08972 14.7002 4.2492 14.5408L12.1604 6.62584L12.1994 6.58929C12.6756 6.08644 13.2494 5.68611 13.8857 5.41283C14.5221 5.13955 15.2075 4.99907 15.9 5Z"
                                    fill="#B695F8"
                                  />
                                </svg>
                              </div>
                              <input
                                type="text"
                                className="reply-input px-3"
                                placeholder="Reply to this question"
                                onChange={(e) =>
                                  setReply(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-span-2">
                            <button className="reply-btn px-5 rounded-lg">
                              Reply
                            </button>
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
            )} */}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
</div>;
