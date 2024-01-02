import { useParams, useNavigate } from "react-router-dom";
import MyThreadDetailJumbo from "./MyThreadDetailJumbo";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import {
  getAllCommentsThunk,
  getSingleThreadThunk,
} from "store/workspace/workspaceThreads";
import { BUSINESS_ID } from "utills/globalVars";
import Cookies from "js-cookie";
import { formateDateAndTime } from "utills/moment";
import { generateId } from "utills/uid";
import { ThreadsSkeleton } from "../threads-skeleton/ThreadsSkeleton";
import { ThreadDetailsSkeleton } from "../threads-skeleton/ThreadDetailsSkeleton";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { ThreeDotIcon } from "utills/svgs/ThreeDotIcon";
import TruncateText from "global-components/StringSlicer";
const MyThreadDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getSingleThread);
  const { data: comments } = useSelector((state) => state.getAllComments);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { isLoading, sideLoader } = useSelector((state) => state.global);
  const { id } = useParams();
  const [showThreadsComments, setShowThreadsComments] = useState(false);
  const [newThread, setNewThread] = useState(null);

  const getComments = () => {
    const payload = {
      business_id,
      thread_id: id,
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
    const payload = {
      business_id,
      thread_id: id,
    };
    dispatch(setLoader(true));
    dispatch(getSingleThreadThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        getComments();
      });
  }, [dispatch, id]);

  const goBack = () => {
    navigate("/threads");
  };

  const toggleComments = () => {
    setShowThreadsComments(!showThreadsComments);
  };
  return (
    <div>
      <MyThreadDetailJumbo goBack={goBack} />
      <div className="my-threads md:px-10 ">
        <div>
          <div className="my-thread shadow relative">
            <div className="my-thread-actions absolute right-5 top-3 flex gap-4">
              {/* <div className="cursor-pointer">
                <ThreeDotIcon />
              </div> */}
            </div>
            {isLoading ? (
              <ThreadDetailsSkeleton />
            ) : (
              <div>
                {data && (
                  <div>
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
                        <div className="my-thread-name">{data?.title}</div>
                        <div className="my-thread-date mt-1">
                          {formateDateAndTime(data?.created_at)}
                        </div>
                        <div className="my-thread-title mt-1">
                          {data?.title?.slice(0, 100)}
                        </div>
                        <div className="my-thread-description break-words mt-1">
                          <TruncateText
                            index={data.created_at}
                            text={data?.description}
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>

                    {data?.attachments.length > 0 ? (
                      <div className="thread-download">
                        <div className="ann-btns  mt-2 flex gap-2">
                          {data?.attachments.map((att, index) => (
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

                    <hr className="mt-3" />
                  </div>
                )}

                <div className="my-thread-comment-btns detail-comment-btn flex items-center justify-between p-2">
                  <div>
                    <button className="flex gap-1 px-2 py-1">
                      {" "}
                      <span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.9975 4.6646e-07C9.07949 0.000313139 7.1949 0.502192 5.53074 1.45584C3.86657 2.40948 2.48069 3.78174 1.5106 5.43644C0.540515 7.09115 0.0199498 8.97077 0.000562093 10.8888C-0.0188257 12.8068 0.463638 14.6966 1.40008 16.3706L0.451119 19.6814C0.373629 19.9405 0.367681 20.2157 0.433906 20.478C0.500132 20.7402 0.636063 20.9796 0.827294 21.1709C1.01852 21.3621 1.25793 21.498 1.52014 21.5643C1.78234 21.6305 2.05758 21.6246 2.31669 21.5471L5.62726 20.598C7.09415 21.4194 8.72979 21.8935 10.4085 21.984C12.0872 22.0746 13.7644 21.779 15.3111 21.1202C16.8578 20.4613 18.2329 19.4567 19.3307 18.1834C20.4286 16.9102 21.22 15.4022 21.6442 13.7753C22.0683 12.1484 22.1139 10.4459 21.7775 8.79867C21.4411 7.15141 20.7315 5.6032 19.7034 4.27296C18.6753 2.94273 17.356 1.86589 15.8468 1.12515C14.3376 0.384418 12.6787 -0.000489118 10.9975 4.6646e-07ZM10.9975 20.7059C9.25557 20.7054 7.54588 20.236 6.04782 19.3471C5.94484 19.2921 5.83024 19.2625 5.71353 19.2608C5.65515 19.2565 5.59651 19.2638 5.54099 19.2824L1.96083 20.3069C1.92335 20.3184 1.88344 20.3195 1.84539 20.3101C1.80734 20.3006 1.77258 20.281 1.74485 20.2532C1.71713 20.2255 1.69749 20.1908 1.68804 20.1527C1.67859 20.1146 1.6797 20.0747 1.69124 20.0373L2.71568 16.4569C2.73987 16.3724 2.7466 16.2839 2.73548 16.1968C2.72435 16.1096 2.6956 16.0257 2.65098 15.95C1.55889 14.1079 1.10663 11.9564 1.36464 9.83054C1.62265 7.70466 2.57645 5.72379 4.07746 4.1965C5.57848 2.66921 7.54242 1.68124 9.66339 1.38649C11.7844 1.09174 13.9433 1.50676 15.8038 2.56691C17.6643 3.62705 19.122 5.27279 19.9499 7.24777C20.7777 9.22275 20.9292 11.4161 20.3807 13.4861C19.8322 15.5562 18.6145 17.3867 16.9174 18.6925C15.2202 19.9984 13.1388 20.7063 10.9975 20.7059ZM15.0953 9.27451C15.0953 9.44612 15.0271 9.6107 14.9058 9.73205C14.7844 9.8534 14.6199 9.92157 14.4483 9.92157H7.54674C7.37514 9.92157 7.21057 9.8534 7.08923 9.73205C6.96789 9.6107 6.89973 9.44612 6.89973 9.27451C6.89973 9.1029 6.96789 8.93832 7.08923 8.81697C7.21057 8.69562 7.37514 8.62745 7.54674 8.62745H14.4483C14.6199 8.62745 14.7844 8.69562 14.9058 8.81697C15.0271 8.93832 15.0953 9.1029 15.0953 9.27451ZM15.0953 12.7255C15.0953 12.8971 15.0271 13.0617 14.9058 13.183C14.7844 13.3044 14.6199 13.3725 14.4483 13.3725H7.54674C7.37514 13.3725 7.21057 13.3044 7.08923 13.183C6.96789 13.0617 6.89973 12.8971 6.89973 12.7255C6.89973 12.5539 6.96789 12.3893 7.08923 12.268C7.21057 12.1466 7.37514 12.0784 7.54674 12.0784H14.4483C14.6199 12.0784 14.7844 12.1466 14.9058 12.268C15.0271 12.3893 15.0953 12.5539 15.0953 12.7255Z"
                            fill="url(#paint0_linear_1454_762)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1454_762"
                              x1="12.0794"
                              y1="0.273218"
                              x2="12.063"
                              y2="22"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#101828" />
                              <stop offset="0.998509" stop-color="#0D1B37" />
                              <stop offset="1" stop-color="#0A1E46" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>{" "}
                      <span>Comments</span>{" "}
                    </button>
                  </div>
                  <div
                    className={`pr-5 cursor-pointer ${
                      showThreadsComments ? "rotate-90" : ""
                    }`}
                    onClick={toggleComments}
                  >
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
                    </svg>
                  </div>
                </div>

                {comments && comments?.length > 0 && showThreadsComments ? (
                  <div className="my-thread-comments">
                    <hr />
                    {comments &&
                      comments?.map((comment, index) => (
                        <div
                          className="my-thread-comment p-3"
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
                                {formateDateAndTime(comment?.created_at)}
                              </div>
                            </div>
                          </div>
                          <div className="my-thread-description break-words mt-1">
                            <TruncateText
                              index={index}
                              text={comment?.value}
                              maxLength={10}
                            />
                          </div>

                          <hr className="mt-3" />
                        </div>
                      ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyThreadDetailsPage;
