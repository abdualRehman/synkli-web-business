import React from "react";
import { motion } from "framer-motion";
import { SideTimes } from "utills/svgs/SideTimes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import "./css/organizationalSettings.css";
import { DimmedPointDown } from "utills/svgs/DimmedPointDown";

import "react-vertical-timeline-component/style.min.css";

export const Logs = ({ toggleLogs }) => {
  const [mylogs, setmyLogs] = useState([
    {
      image: "https://picsum.photos/200/150",
      text: "John turned off the portal notifications for tasks",
      date: "Mar 10 at 10:00 PM",
    },
    {
      image: "https://picsum.photos/200/150",
      text: "Alice completed her project on time",
      date: "Feb 15 at 3:30 PM",
    },
    {
      image: "https://picsum.photos/200/150",
      text: "Mark received a promotion at work",
      date: "Apr 5 at 9:15 AM",
    },
    {
      image: "https://picsum.photos/200/150",
      text: "Sarah's birthday celebration",
      date: "May 20 at 8:45 PM",
    },
    {
      image: "https://picsum.photos/200/150",
      text: "New product launch event",
      date: "Jun 7 at 2:00 PM",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="add-p-side grid grid-cols-5 ">
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
              onClick={toggleLogs}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Logs</div>
            </div>
          </div>

          <div className="flex justify-end items-center ">
            <div className="app-date-picker">
              {" "}
              <div className="date-picker-point">
                {" "}
                <DimmedPointDown />
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMM dd, yyyy" // Customize the date format
              />
            </div>
          </div>

          <div className="logs-container">
            {/* <VerticalTimeline>
              {mylogs.map((log, index) => (
                <VerticalTimelineElement
                  key={index}
                  className="vertical-timeline-element--work"
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  lineColor="#000"
                  date={log.date}
                  iconStyle={{ background: "#fff", color: "red" }} // Customize the icon style
                  icon={<img src={log.image} alt="Log" />} // Use the log's image as the icon
                >
                  <h3 className="vertical-timeline-element-title">
                    {log.text}
                  </h3>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline> */}
          </div>

          <div className="add-status-container">
            <div className="add-ann-form px-5 mt-3 "></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
