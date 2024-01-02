import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Logs } from "components/molecules/Logs";
import { BgTimes } from "utills/svgs/BgTimes";
import { useDispatch, useSelector } from "react-redux";
import { singleFormLogsThunk } from "store/form";
import InfiniteScroll from "react-infinite-scroller";
import { generateId } from "utills/uid";
import { PhotoIconWhite } from "utills/svgs/PhotoIconWhite";
import { bitsToMegabytes } from "utills/moment";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { SmallLoader } from "components/common/SmallLoader";
export const CustomerFormLogs = ({ toggleFormLogs }) => {
  const dispatch = useDispatch();
  const { singleFormLogs } = useSelector((state) => state.singleFormLogs);

  const [pageSize, setPageSize] = useState(10);
  const { editForm } = useSelector((state) => state.global);
  const [logs, setLogs] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  const fetchLogs = () => {
    console.log(editForm, "customerform");
    const payload = {
      record_id: editForm?.customer_form_data_id,
      page,
      page_size: pageSize,
    };
    dispatch(singleFormLogsThunk(payload))
      .then((response) => {
        console.log(response.payload, "singlepayload");
        const newLogs = [...logs, ...response.payload.logs];
        setLogs(newLogs);
        setCount(response.payload.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMore = () => {
    const totalPages = Math.ceil(count / pageSize);
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    fetchLogs();
  }, [page]);

  const handleLoadMore = (pageNumber) => {
    setPage((prev) => prev + 1);
    console.log("loadingmore", generateId());
  };
  return (
    <div>
      {" "}
      <div>
        {" "}
        <div className="add-p-side grid grid-cols-5 text-black">
          <div className="md:col-span-3 hidden md:block left-side"></div>
          <div className="right-side col-span-5 md:col-span-2">
            <motion.div
              initial={{ x: 700 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
              className="inner-right relative"
            >
              <div>
                <div
                  onClick={toggleFormLogs}
                  className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
                >
                  <BgTimes />
                </div>

                <div className="add-detail pt-10 px-5">
                  <div className="title"> Logs</div>
                </div>

                <InfiniteScroll
                  dataLength={logs?.length}
                  next={handleMore}
                  className="scroler-component"
                  height={250}
                  hasMore={page < Math.ceil(count / pageSize) ? true : false}
                  loader={
                    <div className="w-full flex justify-center items-center">
                      <SmallLoader />
                    </div>
                  }
                >
                  <div className="customer-log-container">
                    {" "}
                    {logs?.map((log, index) => (
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
                          <div className="default-icon-wrap">
                            {" "}
                            <span className="default-icon-self ">
                              <DefaultUserIcon />{" "}
                            </span>
                          </div>
                        )}
                        <div className="activity-details pl-5 py-3">
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
                </InfiniteScroll>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
