import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { SideTimes } from "utills/svgs/SideTimes";
import { PhotoIconWhite } from "utills/svgs/PhotoIconWhite";
import { FetchTaskLogs } from "./hooks/FetchTaskLogs";
import { SmallLoader } from "components/common/SmallLoader";
import { useDispatch, useSelector } from "react-redux";
import { generateId } from "utills/uid";
// import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
import { PickDate } from "utills/svgs/PickDate";
import moment from "moment";
import { ArrowLeft } from "utills/svgs/ArrowLeft";
import { DimArrowDown } from "utills/svgs/DimArrowDown";
import { getTaskLogsThunk } from "store/workspace/workspaceTasks";
import { LogsSkeleton } from "./skeletons/LogsSkeleton";
import { SearchIcon } from "utills/svgs/SearchIcon";

export const TaskLogs = ({ toggleTaskLogs, task_id }) => {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const { data: logs } = useSelector((state) => state.getTaskLogs);
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(1);
  const handleDateChange = (e) => {
    const date = moment(e.target.value).format("DD-MM-YYYY");

    setSelectedDate(date);
  };

  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  const [logsLoader, setLogsLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [data, setData] = useState([]);

  const fetchLogs = () => {
    const payload = {
      task_id,
      page,
    };
    setLogsLoader(true);
    dispatch(getTaskLogsThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setTotalPages(Math.ceil(response.payload.count / 10));
          setData((prevData) => [...prevData, ...response.payload.logs]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLogsLoader(false);
      });
  };
  useEffect(() => {
    fetchLogs();
  }, [task_id, page]);

  const handleScroll = () => {
    console.log("scrolling");
    const div = divRef.current;
    if (div) {
      const isAtBottom = div.scrollTop + div.clientHeight === div.scrollHeight;
      if (isAtBottom) {
        loadMoreData();
      }
    }
  };

  const loadMoreData = () => {
    // Increment the page count and fetch more data
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const [date, setDate] = useState("");
  const setDateto = (date) => {
    console.log(date);
    setDate(date);
  };
  return (
    <div className="add-p-side grid grid-cols-8 ">
      <div className="md:col-span-5 hidden md:block left-side"></div>
      <div className="right-side col-span-8 md:col-span-3">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleTaskLogs}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div>
              <div className="activity-title flex items-center gap-2">
                {" "}
                <span onClick={toggleTaskLogs} className="cursor-pointer">
                  {" "}
                  <ArrowLeft />
                </span>
                Logs
              </div>
            </div>
          </div>

          {/* <DatePicker
            placeholderText="select start date"
            onChange={(date) => setDateto(date)}
            selected={date}
            dateFormat="dd-MM-yyyy"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
          /> */}
          <div className="flex justify-between gap-2  items-center mx-5 mt-3">
            <div>
              <div className="oso-input-container shadow-md">
                <div className="oso-search-icon">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  name="search_text"
                  placeholder="Search"
                  className="oso-input pl-8 pr-5"
                />
              </div>
            </div>

            <div className="log-date-container flex items-center gap-2">
              <span>
                <PickDate />
              </span>
              <span>
                <input type="date" />
              </span>
              <span>
                <DimArrowDown />
              </span>
            </div>
          </div>

          {logsLoader && page === 1 ? (
            <LogsSkeleton />
          ) : (
            <div
              className="activity-container-wrapper mt-5"
              ref={divRef}
              onScroll={handleScroll}
            >
              <div className="activity-container-two mx-10 mb-5">
                {data &&
                  data?.map((log, index) => (
                    <div key={generateId()} className="relative log">
                      <div className="activity-img-wrapper">
                        <img
                          src="https://randomuser.me/api/portraits/men/1.jpg"
                          alt="src"
                          className="activity-img"
                        />
                      </div>
                      <div className="activity-details pl-10 py-3">
                        <div className="activity-text">
                          {<MyComponent htmlContent={log.text} />}
                          {/* <span className="activity-name">John</span> added{" "}
                      <span className="text-blue-900 activity-name">
                        {ac.keyword}
                      </span>{" "}
                      to the list */}
                        </div>

                        {/* <div className="grid grid-cols-3 gap-3">
                      <div className="d-image-container mt-3">
                        <div className="d-image-wrapper flex gap-2 items-center p-2 ">
                          <div>
                            <PhotoIconWhite />
                          </div>
                          <div className="flex flex-col   flex-wrap ">
                            <div>Image.png</div>
                            <div className="image-mb">2.4MB</div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                        <div className="flex items-center gap-2 flex-wrap mt-2">
                          <div className="log-file-wrap">
                            <div className="log-file-container flex gap-2 items-center">
                              <div>
                                {" "}
                                <PhotoIconWhite />{" "}
                              </div>
                              <div className="log-flile-info">
                                <div className="log-file-text">Photo.png </div>
                                <div className="log-file-size"> 2.1 mb </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="activity-date mt-2">
                          {log.created_at}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
