import "./css/forms.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SearchIcon } from "../../../utills/svgs/SearchIcon";
import {
  archiveBusinessFormThunk,
  fetchCustomerFormsThunk,
  fetchSubmissionFormDataThunk,
} from "store/form";
import { useDispatch, useSelector } from "react-redux";
import {
  formHandler,
  handleFormSubmissions,
  setLoader,
  setSideLoader,
} from "store/global/globalReducer";
import Cookies from "js-cookie";

import { Loader } from "components/common/Loader";

import { SideTimes } from "utills/svgs/SideTimes";

import { useParams } from "react-router-dom";
import { BlueCustomerForm } from "utills/svgs/BlueCustomerForm";
import { MidNightForm } from "utills/svgs/MidNightForm";
import { BgShare } from "utills/svgs/BgShare";
import { EyeIcon } from "utills/svgs/EyeIcon";
import { BgPdf } from "utills/svgs/BgPdf";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";

const Forms = ({
  toggleIE,
  toggleForms,
  toggleAddedForms,
  toggleFormDetails,
  togglePreviewForm,
  handleUpdateForm,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: customer } = useSelector(
    (state) => state.viewBusinessCustomerInfo
  );
  const { data: customerFroms } = useSelector(
    (state) => state.fetchCustomerForms
  );
  const { data: customerFromData } = useSelector(
    (state) => state.fetchSubmissionFormData
  );

  const { isLoading } = useSelector((state) => state.global);
  const { businessFormEvent } = useSelector((state) => state.global);
  useEffect(() => {
    dispatch(setLoader(true));
    const business_id = localStorage.getItem("business_id");
    const payload = {
      business_id: business_id,
      customer_id: customer.customer_id,
    };
    dispatch(fetchCustomerFormsThunk(payload))
      .then((response) => {
        // handleFormData(response?.payload[0]?.form_id);
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [dispatch]);
  console.log(businessFormEvent);

  const handleFormData = (form_id) => {
    dispatch(handleFormSubmissions(form_id));
    toggleFormDetails();
  };

  const [searchValue, setSearchValue] = useState("");

  const filteredCustomFormData = customerFromData?.filter((data) => {
    return (
      data?.customer?.first_name
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      data?.customer?.last_name
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      data.created_at.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const updateFormHandle = (form_id) => {
    const form = customerFroms?.find((form) => form?.form_id === form_id);
    if (form) {
      console.log(form, "formm");
      dispatch(formHandler(form));
      handleUpdateForm();
    }
  };
  return (
    <div className="add-p-side grid grid-cols-10 ">
      <div className="col-span-4 left-side"></div>
      <div className="right-side col-span-6">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          {isLoading && <Loader />}
          <div>
            <div
              onClick={toggleForms}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-5 px-5">
              <div className="title">Forms</div>
            </div>
          </div>

          <div className="mt-5">
            {customerFroms && customerFroms.length
              ? customerFroms.map((form, index) => (
                  <div
                    key={index}
                    className="mx-5 cursor-pointer customer-form grid grid-cols-2 shadow-lg mt-2"
                  >
                    <div className="flex gap-2 items-center">
                      <div>
                        {" "}
                        <div className="form-icon-wrapper ">
                          {index % 2 === 0 ? (
                            <span>
                              {" "}
                              <BlueCustomerForm />{" "}
                            </span>
                          ) : (
                            <span>
                              <MidNightForm />
                            </span>
                          )}
                        </div>{" "}
                      </div>
                      <div> {form?.form_name}</div>
                    </div>
                    <div className="flex items-center justify-end">
                      <div className="flex items-center justify-end gap-1">
                        {/* <span>
                          {" "}
                          <BgShare />{" "}
                        </span> */}
                        <span
                          className="cursor-pointer"
                          onClick={() => handleFormData(form?.form_id)}
                        >
                          {" "}
                          <EyeIcon />{" "}
                        </span>
                        <span>
                          {" "}
                          <BgPdf />{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Forms;
