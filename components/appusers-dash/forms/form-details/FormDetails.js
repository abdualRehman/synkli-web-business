import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { archiveSubmissionFormThunk } from "store/form";
import {
  formHandler,
  handleEditForm,
  setLoader,
} from "store/global/globalReducer";
import { motion } from "framer-motion";
import { SideTimes } from "utills/svgs/SideTimes";
import "./css/form-details.css";

import { formatHumanReadableDate, formateDate } from "utills/moment";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgShare } from "utills/svgs/BgShare";
import { BgPdf } from "utills/svgs/BgPdf";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { EyeIcon } from "utills/svgs/EyeIcon";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { ShareModal } from "./ShareModal";
import { NoDataFound } from "components/common/NoDataFound";

import { ACCESS_TOKEN, ERROR_TYPE_ERROR } from "utills/globalVars";
import { toastHandler } from "responseHanlder";
import { formateDateTime } from "./../../../../utills/moment";
import { useGetFormSubmissions } from "Hooks/useGetFormSubmissions";
import logsIcon from "../../../../files/logsIcon.svg";
import { Loader } from "components/common/Loader";
import ConfirmationModal from "utills/confirmationModal";
import { toast } from "react-toastify";
export const FormDetails = ({
  toggleFormDetails,
  id,
  toggleEditForm,
  togglePreviewForm,
  toggleAttachments,
  toggleFormLogs,
}) => {
  const dispatch = useDispatch();
  const { formSubmissionsId } = useSelector((state) => state.global);
  const customerFormDataPayload = {
    form_id: formSubmissionsId,
    business_client_id: id,
  };

  const [deleteIndex, setDeleteIndex] = useState(null);
  const { isLoading } = useSelector((state) => state.global);
  const [modalIndex, setModalIndex] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const { data: loginData } = useSelector((state) => state.login);
  const { data: formsData } = useSelector(
    (state) => state.fetchSubmissionFormData
  );
  const { allPermissions } = useSelector((state) => state.global);
  const { fetchSubmissions } = useGetFormSubmissions();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const shareForm = (index) => {
    if (index) {
      const form = formsData[index];
      const text = form?.form_name;
      console.log(index);

      setModalIndex(index);
      setShowShareModal(!showShareModal);
    }

    setModalIndex(index);
    setShowShareModal(!showShareModal);
  };
  useEffect(() => {
    console.log(range, "dateeee");
    // // Convert the 'from' and 'to' dates if necessary
    // if (from !== "" && to !== "") {
    //   const fromDate = convertDateFormat(from);
    //   const toDate = convertDateFormat(to);

    //   // Filter forms based on the converted date range
    //   const newForms = formsData?.filter((form) => {
    //     // Convert the form's created_at to dd-mm-yyyy format using moment
    //     const formDate = moment(form.created_at, "DD-MM-YYYY").format(
    //       "DD-MM-YYYY"
    //     );
    //     console.log(formDate, "fromtooo");
    //     // Check if the formDate is within the specified range
    //     return moment(formDate, "DD-MM-YYYY").isBetween(
    //       moment(fromDate, "DD-MM-YYYY"),
    //       moment(toDate, "DD-MM-YYYY"),
    //       null,
    //       "[]"
    //     );
    //   });

    //   dispatch(fetchSubmissionFormData.actions.handleUpdate(newForms));
    // }
  }, [range]);

  const showEditForm = (index) => {
    if (loginData?.is_employee) {
      if (allPermissions?.Clients?.write) {
        return toastHandler(
          "You dont have permission to do this action.",
          ERROR_TYPE_ERROR
        );
      }
    }
    const form = formsData[index];
    dispatch(handleEditForm(form));
    toggleEditForm();
  };

  const fetchSubs = () => {
    fetchSubmissions(customerFormDataPayload);
  };
  useEffect(() => {
    dispatch(setLoader(true));
    fetchSubs();
  }, [dispatch, formSubmissionsId]);

  const handleDelete = () => {
    dispatch(setLoader(true));
    setIsConfirmationOpen(false);
    dispatch(archiveSubmissionFormThunk({ customer_form_data_id: deleteId }))
      .then((response) => {
        console.log(response);
        if (response.payload) {
          fetchSubs();
          const newForms = [...formsData];
          const updatedForms = newForms.filter(
            (form) => form.customer_form_data_id !== deleteId
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const deleteForm = (delIndex, delID) => {
    if (loginData?.is_employee) {
      if (allPermissions?.Clients?.write) {
        return toastHandler(
          "You dont have permission to do this action.",
          ERROR_TYPE_ERROR
        );
      }
    }
    setDeleteId(delID);
    setDeleteIndex(delIndex);
    setIsConfirmationOpen(true);
  };

  const handleViewForm = (form_id) => {
    const form = formsData?.find((form) => form?.form_id === form_id);
    dispatch(formHandler(form));

    togglePreviewForm();
  };
  const handlePdfClick = async (form) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    const arr = form.form_id.split("-");
    const name = `${form.form_name}_${arr[arr.length - 1]}`;

    dispatch(setLoader(true));
    const payload = {
      customer_form_data_id: form.customer_form_data_id,
      business_id: form.business_id,
    };

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/business/form-pdf`,
      {
        method: "POST",
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          authorization: access_token ? `Bearer ${access_token}` : "",
          // Add any additional headers if needed
        },
        body: JSON.stringify(payload),
      }
    )
      .then(async (response) => {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("File Has been downloaded!", {
          autoClose: 1000, // Duration in milliseconds (e.g., 3000ms = 3 seconds)
        });
      })
      .catch((error) => console.log(error));
    dispatch(setLoader(false));
  };

  const handleAttchments = (index) => {
    const form = formsData[index];
    dispatch(handleEditForm(form));

    toggleAttachments();
  };

  const handleClearFilter = () => {
    setFrom("");
    setTo("");
    const customerFormDataPayload = {
      form_id: formSubmissionsId,
      business_client_id: id,
    };

    fetchSubmissions(customerFormDataPayload);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpendate, setIsOpendate] = useState(false);

  const handleFormLogs = (form_id, index) => {
    const form = formsData[index];
    dispatch(handleEditForm(form));
    console.log(form, "formsDate");
    toggleFormLogs();
  };
  return (
    <div className="add-p-side grid grid-cols-10 ">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="col-span-1 left-side"></div>
      <div className="right-side col-span-9">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          {isLoading && <Loader />}
          <div>
            <div
              onClick={toggleFormDetails}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-5 px-5">
              <div className="title">
                {formsData && <span>{formsData[0]?.form_name}</span>}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 mt-3">
            {from !== "" || to !== "" ? (
              <button
                onClick={handleClearFilter}
                className="ann-btn rounded-md px-2"
              >
                Clear Filter
              </button>
            ) : (
              ""
            )}
            <div>
              {/* <DatePickerComponent
                type="DateRange"
                isOpen={isOpen}
                // date={from}
                range={range}
                setVisible={(value) => setIsOpen(value)}
                onDateChange={(date) => {
                  setIsOpen(false);

                  setRange(date);
                }}
              /> */}
              {/* <div className="task-sort-date-wrapper  px-2">
                <span className="pickDate">
                  <PickDate />{" "}
                </span>
                <DatePicker
                  name="From"
                  placeholderText="From"
                  selected={from}
                  onChange={(date) => setFrom(date)}
                  dateFormat="dd-MM-yyyy"
                  className="pl-2 datePicker w-20"
                />
                <span className="ml-3">
                  <DimArrowDown />
                </span>
              </div> */}
            </div>

            <div>
              {/* <DatePickerComponent
                type="date"
                isOpen={isOpendate}
                date={to}
                setVisible={(value) => setIsOpendate(value)}
                onDateChange={(date) => {
                  setIsOpendate(false);
                  setTo(date);
                }}
              /> */}
              {/* <div className="task-sort-date-wrapper  px-2">
                <span className="pickDate">
                  <PickDate />{" "}
                </span>
                <DatePicker
                  name="start_date"
                  placeholderText="To"
                  selected={to}
                  onChange={(date) => setTo(date)}
                  dateFormat="dd-MM-yyyy"
                  className="pl-2 datePicker w-20"
                />
                <span className="ml-3">
                  <DimArrowDown />
                </span>
              </div> */}
            </div>
          </div>
          <div
            className={`flex justify-end items-center gap-1 mx-5 add-ann-form ${
              formsData?.length < 1 && "mt-5"
            }`}
          ></div>

          {!formsData || formsData?.length < 1 ? (
            <NoDataFound message="There are no submissions on this form" />
          ) : (
            <div className="m-5 submited-forms">
              <div className="  grid grid-cols-6 gap-5">
                <div> Name</div>

                <div className="flex-1">Date Created</div>
                <div className="flex-1">Date Modified</div>

                <div className="flex-1">Attachments</div>
                <div className="flex-1">Payment Details</div>
                <div className="flex-1">Actions</div>
              </div>

              <hr className="mt-3 " />
              {formsData?.map((form, index) => (
                <div key={index} className=" mt-3">
                  {showShareModal && modalIndex === index ? (
                    <ShareModal
                      url={form?.form_name}
                      title={form.form_name}
                      shareForm={shareForm}
                    />
                  ) : (
                    ""
                  )}{" "}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
                    className={`cursor-pointer    grid grid-cols-6 gap-5 
                         ${
                           deleteIndex === index && isLoading
                             ? "animate-pulse opacity-25 "
                             : ""
                         } `}
                  >
                    <div>
                      {form?.customer?.first_name} {form?.customer?.last_name}
                    </div>

                    <div className="flex-1 flex items-center form-details-date">
                      {formateDate(form?.created_at)}
                    </div>
                    <div className="flex-1 flex items-center form-details-date">
                      {formateDate(parseInt(form?.updated_at))}
                    </div>

                    <div className="flex-1 flex items-center">
                      <div
                        onClick={() => handleAttchments(index)}
                        className="font-bold underline cursor-pointer"
                      >
                        View Attachments
                      </div>{" "}
                    </div>

                    <div className="flex-1 flex gap-2 items-center">
                      <div className="attachments flex items-center gap-1">
                        <LinkIcon />
                        <div> recipt.png </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span
                            className="cursor-pointer"
                            onClick={() => handleFormLogs(form?.form_id, index)}
                          >
                            <img
                              src={logsIcon}
                              className="logout-icon"
                              alt="logs"
                            />{" "}
                          </span>
                          <span
                            onClick={() => handleViewForm(form?.form_id)}
                            className="cursor-pointer"
                          >
                            {" "}
                            <EyeIcon />{" "}
                          </span>
                          <span onClick={() => handlePdfClick(form)}>
                            {" "}
                            <span>
                              {" "}
                              <BgPdf cl />{" "}
                            </span>
                          </span>
                          <span
                            onClick={() => showEditForm(index)}
                            className="cursor-pointer"
                          >
                            {" "}
                            <BgEditIcon />{" "}
                          </span>
                          <span
                            className="cursor-pointer "
                            onClick={() =>
                              deleteForm(index, form?.customer_form_data_id)
                            }
                          >
                            {" "}
                            <BgDeleteIcon />{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <div></div>
                  <hr className="mt-3 " />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
