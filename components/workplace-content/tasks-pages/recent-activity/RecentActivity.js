import { motion } from "framer-motion";
import "./css/recentActivity.css";
import { useEffect, useRef, useState } from "react";
import { SideTimes } from "utills/svgs/SideTimes";

import { useDispatch, useSelector } from "react-redux";
import { generateId } from "utills/uid";
import { PhotoIconWhite } from "utills/svgs/PhotoIconWhite";
import { bitsToMegabytes } from "utills/moment";
import { LogsSkeleton } from "../task-details/skeletons/LogsSkeleton";

import { getAllTasksLogsThunk } from "store/workspace/workspaceTasks";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";

const RecentActivity = ({ toggleActivity }) => {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const perPage = 10; // Number of items per page

  const [logsLoad, setLogsLoad] = useState(false);

  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const fetchLogs = () => {
    setLogsLoad(true);

    dispatch(getAllTasksLogsThunk({ page }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          const count = response.payload.count;
          setTotalPages(Math.ceil(count / perPage));
          setData((prevData) => [...prevData, ...response.payload.logs]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLogsLoad(false);
      });
  };

  const handleScroll = () => {
    console.log("scrolling");
    const div = divRef.current;
    if (div) {
      const isAtBottom = div.scrollTop + div.clientHeight === div.scrollHeight;
      if (isAtBottom) {
        loadMoreData();
      }
      return;
    }
  };

  const loadMoreData = () => {
    // Increment the page count and fetch more data
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="add-p-side grid grid-cols-8 ">
      <div className="md:col-span-6 hidden md:block left-side"></div>
      <div className="right-side col-span-8 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleActivity}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div>
              <div className="activity-title ">Recent Activity</div>
            </div>
          </div>{" "}
          <div
            className="activity-container-wrapper mt-5"
            ref={divRef}
            onScroll={handleScroll}
          >
            {logsLoad && page === 1 ? (
              <LogsSkeleton />
            ) : (
              <div className="activity-container-two mx-10 ">
                {data &&
                  data?.length > 1 &&
                  data?.map((log, index) => (
                    <div key={generateId()} className="relative log">
                      {log?.user?.image ? (
                        <div className="activity-img-wrapper">
                          <img
                            src={log.user.image}
                            alt="src"
                            className="activity-img"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center ">
                          {" "}
                          <DefaultUserIcon />{" "}
                        </div>
                      )}
                      <div className="activity-details pl-10 py-3">
                        <div className="activity-text">
                          {<MyComponent htmlContent={log.text} />}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap mt-2">
                          {log?.files?.length > 0 &&
                            log?.files?.map((file, fileindex) => (
                              <a className="log-file-wrap" href={file?.url}>
                                <div className="log-file-container flex gap-2 items-center">
                                  <div>
                                    {" "}
                                    <PhotoIconWhite />{" "}
                                  </div>
                                  <div className="log-flile-info">
                                    <div className="log-file-text">
                                      {" "}
                                      {file?.name.slice(0, 10)}{" "}
                                    </div>
                                    <div className="log-file-size">
                                      {" "}
                                      {bitsToMegabytes(file?.size ?? 0)}{" "}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            ))}
                        </div>

                        <div className="activity-date mt-1">
                          {log.created_at}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default RecentActivity;
