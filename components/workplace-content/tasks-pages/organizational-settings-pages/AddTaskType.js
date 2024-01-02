import { motion } from "framer-motion";
import { useState } from "react";
import "./css/organizationalSettings.css";
import { uid } from "react-uid";

import "react-notifications/lib/notifications.css";
import { SideTimes } from "utills/svgs/SideTimes";
import { toastHandler } from "responseHanlder";
import { BUSINESS_ID, ERROR_TYPE_ERROR } from "utills/globalVars";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { createTaskTypeThunk } from "store/workspace/workspaceTasks";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { generateId } from "utills/uid";
import { PlusIcon } from "utills/svgs/PlusIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
const AddTaskType = ({ toggleTaskType, toggletypesUpdated }) => {
  const business_id = localStorage.getItem(BUSINESS_ID);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const [taskLoader, setTaskLoader] = useState(false);
  const [fields, setFields] = useState([
    {
      id: generateId(), // Generate a unique ID
      text: "",
    },
  ]);

  const handleAddInput = (e, index) => {
    const newValues = [...fields];
    newValues[index].text = e.target.value;
    setFields(newValues);
  };

  const handleAddField = (index) => {
    const newValues = [...fields];
    if (!newValues[index].text) {
      return toastHandler("Input cant be empty", "error");
    }

    const newInput = {
      id: generateId(), // Generate a unique ID
      text: "",
    };

    newValues.push(newInput);
    setFields(newValues);
  };

  const handleDelete = (index) => {
    const newValues = [...fields];
    newValues.splice(index, 1);
    setFields(newValues);
  };

  const [inputValue, setInputValue] = useState(null);

  const addInput = () => {
    if (!inputValue) {
      toastHandler("Please enter title", ERROR_TYPE_ERROR);
      return;
    }
    const newInput = {
      id: uid * Math.floor(Math.random() * 5), // Generate a unique ID
      text: inputValue,
    };

    setInputs((prevInputs) => [...prevInputs, newInput]);
    setInputValue("");
  };

  const deleteInput = (index) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let types = [];
    console.log(fields, "fields");

    const newInputs = [...fields];
    if (newInputs.length < 1) {
      toastHandler("Please enter atleast one task type", ERROR_TYPE_ERROR);
      return;
    }
    newInputs.map((input) => {
      types.push(input.text);
    });

    const payload = {
      business_id,
      types,
    };
    setTaskLoader(true);
    dispatch(createTaskTypeThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggletypesUpdated();
          toggleTaskType();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTaskLoader(false);
      });
  };

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
              onClick={toggleTaskType}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add Task Type</div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; Organizational Settings &gt; Tasks Type{" "}
                <span className="special-jumbo-text"> &gt; Add Task</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {" "}
            <div className="add-status-container">
              <div className="add-ann-form px-5 mt-3 mb-5">
                {fields.map((input, index) => (
                  <div className="mt-2 " key={index}>
                    <div>
                      <label>Title</label>
                    </div>

                    <div className="grid grid-cols-12 mt-1">
                      <div className="col-span-11">
                        <input
                          onChange={(e) => handleAddInput(e, index)}
                          type="text"
                          placeholder="Enter title"
                          required
                          maxLength={50}
                        />
                      </div>
                      <div className="col-span-1 flex justify-center items-center">
                        {fields?.length > 1 && index < fields?.length - 1 ? (
                          <div
                            onClick={() => handleDelete(index)}
                            className="cursor-pointer"
                          >
                            <BgDeleteIcon />
                          </div>
                        ) : (
                          <div
                            onClick={() => handleAddField(index)}
                            className="cursor-pointer"
                          >
                            <PlusIcon />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div>
                <label>Title</label>{" "}
                <div className="grid grid-cols-12  gap-1">
                  <div className="col-span-11">
                    <input
                      onChange={(e) => handleAddInput(e)}
                      type="text"
                      placeholder="Enter title"
                    />
                  </div>
                  <div
                    onClick={() => addInput()}
                    className="col-span-1 flex justify-center cursor-pointer items-center"
                  >
                    <PlusIcon />
                  </div>
                </div>
              </div> */}
              </div>

              <div className="absolute bottom-5 w-full flex justify-center items-center bg-white py-2">
                <button
                  disabled={taskLoader ? true : false}
                  type="submit"
                  className="add-btn text-white px-5 md:px-28 py-2 flex gap-2 items-center cursor-pointer  rounded-lg"
                >
                  <span>Add</span>
                  {taskLoader && <SmallLoaderWhite />}
                </button>
              </div>
            </div>
          </form>

          {/* <div className="add-status-container">
            <div className="add-ann-form px-5 mt-3 ">
              {inputs.map((input, index) => (
                <div className="mt-2 " key={index}>
                  <div>
                    <label>Title</label>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-11">
                      <div className="task-status"> {input.text} </div>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <div
                        className="cursor-pointer"
                        onClick={() => deleteInput(index)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.64317 0.972696C8.28687 0.348506 9.15728 0 10.0623 0C10.9673 0 11.8377 0.348506 12.4814 0.972696C13.0253 1.50004 13.3696 2.18796 13.4637 2.92441H19.1097C19.3749 2.92441 19.6316 3.02643 19.8228 3.21187C20.0145 3.39774 20.1246 3.65256 20.1246 3.92105C20.1246 4.18953 20.0145 4.44436 19.8228 4.63022C19.6316 4.81567 19.3749 4.91769 19.1097 4.91769H18.2038L17.6059 9.93435L17.1472 9.81213C16.7816 9.71474 16.4076 9.65 16.0298 9.61874L15.6043 9.58353L16.1609 4.91769H3.96478L5.33345 16.4238C5.38912 16.8901 5.61987 17.323 5.98561 17.6389C6.35166 17.9551 6.827 18.1314 7.3215 18.1313H9.82819L9.94403 18.3511C10.1504 18.7426 10.4 19.1095 10.6861 19.4462L11.2626 20.1246H7.32152C6.33622 20.1245 5.3834 19.7733 4.64466 19.1349C3.9056 18.4961 3.43203 17.6138 3.31785 16.6546L1.92073 4.91769H1.01492C0.749762 4.91769 0.493013 4.81567 0.301775 4.63022C0.110107 4.44436 0 4.18953 0 3.92105C0 3.65256 0.110107 3.39773 0.301775 3.21187C0.493013 3.02643 0.749762 2.92441 1.01492 2.92441H6.66094C6.755 2.18796 7.09935 1.50004 7.64317 0.972696ZM10.0623 1.99328C9.68759 1.99328 9.33067 2.13774 9.06946 2.39104C8.91294 2.54282 8.79846 2.72605 8.73194 2.92441H11.3927C11.3262 2.72605 11.2117 2.54282 11.0552 2.39104C10.7939 2.13774 10.437 1.99328 10.0623 1.99328ZM19.4934 19.4925C20.4587 18.5272 21.001 17.2181 21.001 15.853C21.001 14.488 20.4587 13.1788 19.4934 12.2136C18.5282 11.2483 17.219 10.7061 15.854 10.7061C14.4889 10.7061 13.1798 11.2483 12.2145 12.2136C11.2493 13.1788 10.707 14.488 10.707 15.853C10.707 17.2181 11.2493 18.5272 12.2145 19.4925C13.1798 20.4577 14.4889 21 15.854 21C17.219 21 18.5282 20.4577 19.4934 19.4925ZM18.1423 14.1374C18.1423 14.2892 18.0819 14.4349 17.9745 14.5423L16.6626 15.853L17.9745 17.1638C18.0277 17.2169 18.0699 17.2801 18.0987 17.3495C18.1274 17.419 18.1423 17.4935 18.1423 17.5687C18.1423 17.6439 18.1274 17.7183 18.0987 17.7878C18.0699 17.8573 18.0277 17.9204 17.9745 17.9736C17.9214 18.0267 17.8582 18.0689 17.7888 18.0977C17.7193 18.1265 17.6448 18.1413 17.5696 18.1413C17.4944 18.1413 17.42 18.1265 17.3505 18.0977C17.281 18.0689 17.2179 18.0267 17.1648 17.9736L15.854 16.6617L14.5432 17.9736C14.4901 18.0267 14.4269 18.0689 14.3575 18.0977C14.288 18.1265 14.2135 18.1413 14.1383 18.1413C14.0631 18.1413 13.9887 18.1265 13.9192 18.0977C13.8497 18.0689 13.7866 18.0267 13.7334 17.9736C13.6803 17.9204 13.6381 17.8573 13.6093 17.7878C13.5805 17.7183 13.5657 17.6439 13.5657 17.5687C13.5657 17.4935 13.5805 17.419 13.6093 17.3495C13.6381 17.2801 13.6803 17.2169 13.7334 17.1638L15.0453 15.853L13.7334 14.5423C13.6261 14.4349 13.5657 14.2892 13.5657 14.1374C13.5657 13.9855 13.6261 13.8399 13.7334 13.7325C13.8408 13.6251 13.9865 13.5648 14.1383 13.5648C14.2902 13.5648 14.4358 13.6251 14.5432 13.7325L15.854 15.0444L17.1648 13.7325C17.2721 13.6251 17.4178 13.5648 17.5696 13.5648C17.7215 13.5648 17.8672 13.6251 17.9745 13.7325C18.0819 13.8399 18.1423 13.9855 18.1423 14.1374Z"
                            fill="#B695F8"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-12 mt-2">
                <div className="col-span-11">
                  <input
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    value={inputValue}
                  />
                </div>
                <div
                  onClick={addInput}
                  className="col-span-1 flex justify-center cursor-pointer items-center"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.1"
                      width="36"
                      height="36"
                      rx="18"
                      fill="url(#paint0_linear_1526_1924)"
                    />
                    <path
                      d="M17.5836 6.07891C17.4711 6.1211 17.2883 6.24297 17.1805 6.35078C16.8055 6.7211 16.8289 6.38828 16.8289 11.9148V16.8273H11.9164C6.38984 16.8273 6.72266 16.8086 6.35234 17.1789C5.89297 17.6383 5.89297 18.3602 6.35234 18.8195C6.72266 19.1898 6.38984 19.1711 11.9164 19.1711H16.8289V24.0836C16.8289 29.6102 16.8102 29.2773 17.1805 29.6477C17.6398 30.107 18.3617 30.107 18.8211 29.6477C19.1914 29.2773 19.1727 29.6102 19.1727 24.0836V19.1711H24.0852C29.6117 19.1711 29.2789 19.1898 29.6492 18.8195C30.1086 18.3602 30.1086 17.6383 29.6492 17.1789C29.2789 16.8086 29.6117 16.8273 24.0852 16.8273H19.1727V11.9148C19.1727 6.38828 19.1914 6.7211 18.8211 6.35078C18.4977 6.02266 18.0289 5.92422 17.5836 6.07891Z"
                      fill="url(#paint1_linear_1526_1924)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_1526_1924"
                        x1="19.7664"
                        y1="0.447084"
                        x2="19.7394"
                        y2="36.0001"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#101828" />
                        <stop offset="0.998509" stop-color="#0D1B37" />
                        <stop offset="1" stop-color="#0A1E46" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1526_1924"
                        x1="19.1777"
                        y1="29.6943"
                        x2="19.1597"
                        y2="6.00727"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#101828" />
                        <stop offset="0.998509" stop-color="#0D1B37" />
                        <stop offset="1" stop-color="#0A1E46" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className="add-service-bottom">
              <button
                onClick={handleSubmit}
                disabled={taskLoader ? true : false}
                className="add-btn text-white px-5 md:px-28 py-2 flex gap-2 items-center cursor-pointer  rounded-lg"
              >
                Add {taskLoader && <SmallLoaderWhite />}
              </button>
            </div>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};
export default AddTaskType;
