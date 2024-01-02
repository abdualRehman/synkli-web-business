import { Text } from "components/atoms/inputs/Text";
import React, { useState } from "react";
import "./css/global-components.css";
import { motion } from "framer-motion";
import { PrimaryBtn } from "components/atoms/buttons/PrimaryBtn";
import { BgTimes } from "utills/svgs/BgTimes";
import { toastHandler } from "responseHanlder";
export const AddHint = ({
  toggleModal,
  handleHint,
  stepIndex,
  fieldIndex,
  field,
  viewHint,
  newHint,
}) => {
  const [hint, setHint] = useState(field?.hint);
  console.log(hint, "hinttttt");
  const handleOnChange = (e) => {
    const value = e.target.value;
    setHint(value);
    console.log(value, "value");
  };

  const handleAddHint = () => {
    if (!hint) {
      toastHandler("please add hint", "error");
      return;
    }

    handleHint(hint, stepIndex, fieldIndex);
    toggleModal();
  };
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="add-hint-container "
    >
      {viewHint ? (
        <div className="p-3 add-ann-form">
          {" "}
          <label>{newHint}</label>{" "}
        </div>
      ) : (
        <div className="w-full h-full relative p-3">
          <div
            className="flex justify-end items-center cursor-pointer"
            onClick={toggleModal}
          >
            <BgTimes />
          </div>{" "}
          {/* <div className="hint-arrow"> </div> */}
          <div className="add-ann-form">
            <label> Add Hint</label>
          </div>
          <div>
            {" "}
            <Text
              length={60}
              placeholder={"Enter hint"}
              isRequired={true}
              atChange={handleOnChange}
              value={hint}
            />{" "}
            <div className="mt-2 flex justify-end items-center">
              <PrimaryBtn
                text={"Add"}
                atClick={() => handleAddHint()}
                isDisabled={false}
                px={"px-5"}
                type="ann-btn"
                styles={{}}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
