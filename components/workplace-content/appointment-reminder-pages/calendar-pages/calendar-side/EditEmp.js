import { motion } from "framer-motion";
import { useState } from "react";
import "./css/calendarSide.css";
import Details from "./Details";
import Notes from "./Notes";
import Timeline from "./Timeline";
const EditEmp = ({ toggleEditEmp }) => {
  const [condition, setCondition] = useState(1);

  const handleCondition = (condition) => {
    setCondition(condition);
  };

  const componentProvider = () => {
    return (
      <div>
        {condition === 1 && (
          <div>
            {" "}
            <Details />{" "}
          </div>
        )}
        {condition === 2 && (
          <div>
            {" "}
            <Notes />{" "}
          </div>
        )}
        {condition === 3 && (
          <div>
            {" "}
            <Timeline />{" "}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="add-p-side grid grid-cols-6 ">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleEditEmp}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#666666" />
                <path
                  d="M19 8L8 19"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M19 19L8 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Edit - John Doe</div>

              <div className="jumbo-dir mt-2">
                Appointments &gt; Calendar{" "}
                <span className="special-jumbo-text"> &gt; Edit John Doe </span>
              </div>
            </div>
          </div>

          <div className="forms-buttons mt-3 mx-5 grid grid-cols-4 gap-1 edit-emp-togglers">
            <div
              onClick={() => handleCondition(1)}
              className={`forms-btn cursor-pointer   shadow-lg ${
                condition === 1 && "forms-active-btn"
              }`}
            >
              {" "}
              Details{" "}
            </div>
            <div
              onClick={() => handleCondition(2)}
              className={`forms-btn cursor-pointer   shadow-lg ${
                condition === 2 && "forms-active-btn"
              }`}
            >
              {" "}
              Notes{" "}
            </div>
            <div
              onClick={() => handleCondition(3)}
              className={`forms-btn cursor-pointer   shadow-lg ${
                condition === 3 && "forms-active-btn"
              }`}
            >
              {" "}
              Timeline{" "}
            </div>
          </div>

          <div className="component-display">{componentProvider()}</div>
        </motion.div>
      </div>
    </div>
  );
};
export default EditEmp;
