import "./css/threads.css";
import { useEffect, useState } from "react";
import MyThreadsJumbo from "./my-threads/MyThreadsJumbo";
import { useNavigate } from "react-router-dom";
import NoThreads from "./my-threads/NotThreads";
import { LinkIcon } from "../../../utills/svgs/LinkIcon";
import { EyeIcon } from "../../../utills/svgs/EyeIcon";
import { ThreeDotIcon } from "../../../utills/svgs/ThreeDotIcon";
import { CommentIcon } from "../../../utills/svgs/CommentIcon";
import { DimmedArrowRight } from "../../../utills/svgs/DimmedArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import {
  getAllCommentsThunk,
  getAllThreadsThunk,
} from "store/workspace/workspaceThreads";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { formateDateAndTime } from "utills/moment";
const MyThreads = ({ toggleMyNewThread }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [threadsUpdate, setThreadsUpdate] = useState(false);
  const { isLoading, sideLoader } = useSelector((state) => state.global);

  const { data } = useSelector((state) => state.getAllThreads);
  const { data: comments } = useSelector((state) => state.getAllComments);
  const toggleThreadsUpdate = () => {
    setThreadsUpdate(!threadsUpdate);
  };

  useEffect(() => {
    dispatch(setLoader(true));
    const payload = {
      business_id,
    };
    dispatch(getAllThreadsThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [dispatch, threadsUpdate]);

  return (
    <div>
      <MyThreadsJumbo toggleMyNewThread={toggleMyNewThread} />
      {data && data.length < 1 ? (
        <NoThreads />
      ) : (
        <div className="my-threads md:px-10 ">
          <div>
            {data &&
              data.map((thread, index) => (
                <div className="my-thread shadow relative" key={thread.id}>
                  <div className="my-thread-actions absolute right-5 top-3 flex items-center gap-4">
                    <div
                      onClick={() =>
                        navigate(`/my/threads/details/${thread?.thread_id}`)
                      }
                      className="cursor-pointer"
                    >
                      <EyeIcon />
                    </div>
                    <div className="cursor-pointer">
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
                    <div className=" my-thread-content ml-16">
                      <div className="my-thread-name">{thread?.title}</div>
                      <div className="my-thread-date mt-1">
                        {formateDateAndTime(thread?.created_at)}
                      </div>
                      <div className="my-thread-title mt-1">
                        {thread.title.slice(0, 100)}
                      </div>
                      <div className="my-thread-description mt-1">
                        {thread?.description}
                      </div>
                    </div>
                  </div>

                  <hr className="mt-3" />

                  <div className="my-thread-comment-btns flex items-center justify-between p-2">
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
                      <DimmedArrowRight />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyThreads;
