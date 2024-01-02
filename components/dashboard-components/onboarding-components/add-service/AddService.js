import { useDispatch, useSelector } from "react-redux";
import "./css/addService.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllServicesThunk } from "store/auth/slices";
import { useState } from "react";
import { toastHandler } from "responseHanlder";
import Cookies from "js-cookie";
import { SmallLoader } from "components/common/SmallLoader";
import { BUSINESS_ID, ERROR_TYPE_ERROR } from "utills/globalVars";
import { BgPlusIcon } from "utills/svgs/BgPlusIcon";
import { BigPlusIcon } from "utills/svgs/BigPlusIcon";
import { Plus } from "utills/svgs/Plus";
import { convertMinutesToHours } from "utills/dataValidation";
import TruncateText from "global-components/StringSlicer";

const AddService = ({ toggleServiceSide, isServiceUpdated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [servicesData, setServicesData] = useState(null);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [serviceLoader, setServiceLoader] = useState(false);

  useEffect(() => {
    if (!business_id) {
      toastHandler("You need to be logged in first", ERROR_TYPE_ERROR);
      navigate("/signup");
      return;
    }
    setServiceLoader(true);
    console.log(business_id);
    setTimeout(() => {
      dispatch(getAllServicesThunk({ business_id }))
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            setServicesData(response.payload);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setServiceLoader(false);
        });
    }, 1000);
  }, [dispatch, isServiceUpdated]);

  return (
    <div className=" service py-2 relative business-profile">
      <div className="flex justify-end">
        <button
          onClick={toggleServiceSide}
          className="add-btn  p-2 mr-2 px-5 rounded-md text-white"
        >
          <Plus />
        </button>
      </div>
      {serviceLoader ? (
        <div className="branch-location-loader">
          {" "}
          <SmallLoader />{" "}
        </div>
      ) : (
        <div className="mt-2">
          {servicesData && servicesData[0] ? (
            servicesData?.map((service, index) => (
              <div
                className={`service-body p-2 rounded-md mx-2 shadow-md ${
                  index > 0 && "mt-5"
                }`}
                key={index}
              >
                <div className="title">{service.name}</div>
                <div className="flex gap-2 mt-2">
                  <div className="sub-title">Consultation Charges:</div>
                  <div className="dollers"> $ {service.charges}</div>
                </div>

                <div className="legend flex gap-2 items-center mt-1 flex-wrap px-2 rounded-xl">
                  <div className="flex gap-2 items-center">
                    <div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="20" height="20" rx="10" fill="white" />
                        <path
                          d="M10 5V11.6667H15"
                          stroke="#B695F8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div>Min-Time of Consultation:</div>
                  </div>
                  <div className="col-span-1">{service?.duration} mins </div>
                </div>

                <div className="details mt-3">
                  <div className="title">Details</div>
                  <div className="details-par break-words">
                    <TruncateText
                      index={index}
                      text={service?.description}
                      maxLength={70}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="h-80 flex justify-center items-center not-found-message">
              {" "}
              No service added yet{" "}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AddService;
