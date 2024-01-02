import { motion } from "framer-motion";
import { useState } from "react";
import "./css/organizationalSettings.css";
import { uid } from "react-uid";

import "react-notifications/lib/notifications.css";
import { toastHandler } from "responseHanlder";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  TOAST_TYPE_ERROR,
} from "utills/globalVars";
import { SideTimes } from "utills/svgs/SideTimes";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { createTaskStatusThunk } from "store/workspace/workspaceTasks";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { PlusIcon } from "utills/svgs/PlusIcon";
import { BlueDelIcon } from "utills/svgs/BlueDelIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { generateId } from "utills/uid";

const AddDynamicStatus = ({ toggleAddStatus, toggleStatusUpdate }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [inputValue, setInputValue] = useState("");
  const [taskLoader, setTaskLoader] = useState(false);
  const [values, setValues] = useState([]);
  const [fields, setFields] = useState([
    {
      id: generateId(), // Generate a unique ID
      text: "",
    },
  ]);

  const [vals, setVals] = useState(0);

  const addValue = (e) => {
    const newValues = [...values];
    newValues.push(e.target.value);
    setValues(newValues);
  };

  const addInput = () => {
    // if (!value) {
    //   toastHandler("Please enter a status", TOAST_TYPE_ERROR);
    //   return;
    // }
    // const newInput = {
    //   id: uid * Math.random(), // Generate a unique ID
    //   text: value,
    // };

    // setInputs((prevInputs) => [...prevInputs, newInput]);
    // setInputValue("");

    setVals(vals + 1);
  };

  const returnInputs = () => {
    for (let i = 0; i <= vals; i++) {
      <div>
        return{" "}
        <input
          onChange={(e) => setInputValue(e)}
          type="text"
          placeholder="Enter title"
        />
      </div>;
    }
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
    console.log(fields, "fields");

    if (fields.length < 1) {
      toastHandler("Please enter atleast one status", ERROR_TYPE_ERROR);
      return;
    }
    let statuses = [];
    const newInputs = [...fields];

    newInputs.map((input) => {
      statuses.push(input?.text);
    });

    // newInputs.map((input) => {
    //   statuses.push(input?.text);
    // });

    const payload = {
      business_id,
      statuses: statuses,
    };

    console.log(payload);
    setTaskLoader(true);
    dispatch(createTaskStatusThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleStatusUpdate();
          toggleAddStatus();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTaskLoader(false);
      });
  };

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
              onClick={toggleAddStatus}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add Dynamic Status</div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; Organizational Settings &gt; Dynamic Tasks{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Add Dynamic Status
                </span>
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
              <div>{returnInputs}</div>
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
        </motion.div>
      </div>
    </div>
  );
};
export default AddDynamicStatus;
