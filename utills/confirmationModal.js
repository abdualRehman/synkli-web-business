// ConfirmationModal.js
import React from "react";
import PropTypes from "prop-types";
import { BgTimes } from "./svgs/BgTimes";
import { ErrorSvg } from "./svgs/ErrorSvg";
import { SuccessSvg } from "./svgs/SuccessSvg";
import { useDispatch } from "react-redux";
import { setIsConfirmationOpen } from "store/global/globalReducer";
import { motion } from "framer-motion";
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  description,
  confirmbtnTxt,
  cancelBtnTxt,
  title = "",
  type = "error", // error or success
  sidebarLog,
}) => {
  const dispatch = useDispatch();
  console.log(isOpen, "isOpen");
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    sidebarLog && dispatch(setIsConfirmationOpen(false));
    onConfirm();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-index confirmation-modal">
      <div className="bg-black opacity-75 fixed inset-0"></div>
      <motion.div
        initial={{ y: "-150" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-white p-8 max-w-xl width-40 mx-auto rounded-md z-index relative"
      >
        <div
          onClick={onClose}
          className="absolute right-5 top-5 cursor-pointer scale-125"
        >
          <BgTimes />
        </div>
        <div className="flex gap-3 items-center">
          {" "}
          <div>{type === "error" ? ErrorSvg : SuccessSvg}</div>
          <div className="items-center justify-center w-full  ml-3">
            <h5>{title ? title : "Confirmation"}</h5>
          </div>
        </div>
        <p className="mb-4 ml-6">
          {description ? description : "Are you sure you want to delete?"}{" "}
        </p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 ann-btn text-white rounded-md"
            onClick={handleConfirm}
          >
            {confirmbtnTxt ? confirmbtnTxt : "Confirm"}
          </button>
          <button
            className="px-4 py-2 secondary-btn rounded-md"
            onClick={onClose}
          >
            {cancelBtnTxt ? cancelBtnTxt : "Cancel"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
