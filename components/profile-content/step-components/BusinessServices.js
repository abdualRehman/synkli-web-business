import { useState } from "react";
import Cookies from "js-cookie";
import { deleteServiceThunk } from "store/auth/slices";
import { generateId } from "utills/uid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editService, setSideLoader } from "store/global/globalReducer";
import { toastHandler } from "responseHanlder";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  PERMISSIONS_MESSAGE,
  TOAST_TYPE_ERROR,
} from "utills/globalVars";
import { useFetchServices } from "components/workplace-content/tasks-pages/task-details/hooks/useFetchServices";
import ConfirmationModal from "utills/confirmationModal";
const BusinessServices = ({ toggleServiceSide, servicesData }) => {
  const dispatch = useDispatch();
  const [serviceModal, setServiceModal] = useState(false);
  const { data } = useSelector((state) => state.getAllServices);
  const [serviceInView, setServiceInView] = useState("");
  const [serviceIndex, setServiceIndex] = useState(null);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { fetchServices } = useFetchServices();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  function toggleServiceModal(index) {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setServiceIndex(index);
      setServiceModal(!serviceModal);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, TOAST_TYPE_ERROR);
    }
  }

  function serviceHandler(id) {
    const findService = data?.find((ser) => ser?.business_service_id === id);
    setServiceInView(findService);
  }
  const editHandler = (service) => {
    toggleServiceSide();
    dispatch(editService(service));
  };

  const handleDelete = () => {
    const delData = {
      business_service_id: deleteId,
      business_id: business_id,
    };
    setIsConfirmationOpen(false);

    dispatch(deleteServiceThunk(delData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          fetchServices();
          toastHandler("Service deleted successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  const deleteService = (service_id) => {
    dispatch(setSideLoader(true));

    setDeleteId(service_id);
    setIsConfirmationOpen(true);
  };
  console.log(data);

  const handleAdService = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      toggleServiceSide();
    } else {
      toastHandler(PERMISSIONS_MESSAGE, TOAST_TYPE_ERROR);
    }
  };
  return (
    <div className="md:px-10 px-5  mt-3 ">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="md:grid grid-cols-2 b-h-container">
        <div className="p-5 service-scroll ">
          <div className="top-btn-service flex justify-end">
            <button
              onClick={handleAdService}
              className=" text-white px-4 py-1 rounded-md"
            >
              Add Service
            </button>
          </div>

          <div className="mt-2">
            {data &&
              data?.map((service, index) => (
                <div
                  onClick={() => serviceHandler(service?.business_service_id)}
                  key={generateId()}
                  className="service-div shadow-md rounded-lg cursor-pointer p-3 mt-3 relative"
                >
                  <div
                    onClick={() => toggleServiceModal(index)}
                    className="absolute right-2 cursor-pointer"
                  >
                    <svg
                      width="4"
                      height="13"
                      viewBox="0 0 4 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="2"
                        cy="2"
                        r="2"
                        fill="url(#paint0_linear_1360_40)"
                      />
                      <circle
                        cx="2"
                        cy="8"
                        r="2"
                        fill="url(#paint1_linear_1360_40)"
                      />
                      <circle
                        cx="2"
                        cy="14"
                        r="2"
                        fill="url(#paint2_linear_1360_40)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1360_40"
                          x1="2.19626"
                          y1="0.049676"
                          x2="2.19327"
                          y2="4.00001"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_1360_40"
                          x1="2.19626"
                          y1="6.04968"
                          x2="2.19327"
                          y2="10"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_1360_40"
                          x1="2.19626"
                          y1="12.0497"
                          x2="2.19327"
                          y2="16"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {serviceModal && serviceIndex === index ? (
                    <div className="absolute service-modal shadow right-5 top-10">
                      <div
                        onClick={() => editHandler(service)}
                        className="flex gap-2 px-2 py-2 modal-div cursor-pointer"
                      >
                        <div className="service-icon">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 18 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1.875 20C1.35937 20 0.918125 19.8043 0.55125 19.413C0.18375 19.021 0 18.55 0 18V2C0 1.45 0.18375 0.979 0.55125 0.587C0.918125 0.195667 1.35937 0 1.875 0H9.375L15 6V10H13.125V7H8.4375V2H1.875V18H7.5V20H1.875ZM13.4062 12.525L14.4141 13.6L10.7812 17.45V18.5H11.7656L15.3984 14.65L16.3828 15.7L12.3516 20H9.375V16.825L13.4062 12.525ZM16.3828 15.7L13.4062 12.525L14.7656 11.075C14.9375 10.8917 15.1562 10.8 15.4219 10.8C15.6875 10.8 15.9062 10.8917 16.0781 11.075L17.7422 12.85C17.9141 13.0333 18 13.2667 18 13.55C18 13.8333 17.9141 14.0667 17.7422 14.25L16.3828 15.7Z" />
                          </svg>
                        </div>
                        <div>Edit</div>
                      </div>
                      <div
                        onClick={() =>
                          deleteService(service?.business_service_id)
                        }
                        className="flex gap-2 px-2 py-2 modal-div cursor-pointer"
                      >
                        <div className="service-icon ">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 21 21"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M7.42494 0.944801C8.05026 0.338434 8.89581 -0.00012207 9.775 -0.00012207C10.6542 -0.00012207 11.4997 0.338434 12.1251 0.944801C12.6534 1.45708 12.9879 2.12537 13.0793 2.84079H18.5641C18.8216 2.84079 19.0711 2.9399 19.2568 3.12004C19.443 3.3006 19.55 3.54815 19.55 3.80897C19.55 4.06979 19.443 4.31734 19.2568 4.49789C19.0711 4.67804 18.8216 4.77715 18.5641 4.77715H17.6841L17.1032 9.65057L16.6576 9.53185C16.3025 9.43724 15.9391 9.37434 15.5721 9.34397L15.1588 9.30977L15.6994 4.77715H3.85157L5.18116 15.9547C5.23524 16.4077 5.45941 16.8282 5.8147 17.1351C6.1703 17.4423 6.63207 17.6136 7.11245 17.6135H9.54757L9.6601 17.827C9.8606 18.2073 10.103 18.5638 10.381 18.8908L10.9411 19.5499H7.11247C6.1553 19.5498 5.22969 19.2086 4.51204 18.5884C3.79408 17.9679 3.33404 17.1108 3.22312 16.179L1.86588 4.77715H0.985937C0.728354 4.77715 0.478937 4.67804 0.293159 4.49789C0.106963 4.31734 0 4.06979 0 3.80897C0 3.54815 0.106963 3.3006 0.293159 3.12004C0.478937 2.9399 0.728354 2.84079 0.985937 2.84079H6.47075C6.56212 2.12537 6.89665 1.45708 7.42494 0.944801ZM9.775 1.93624C9.41098 1.93624 9.06426 2.07658 8.8105 2.32265C8.65845 2.47009 8.54724 2.64809 8.48262 2.84079H11.0674C11.0028 2.64809 10.8915 2.47009 10.7395 2.32265C10.4857 2.07658 10.139 1.93624 9.775 1.93624ZM18.9359 18.9353C19.8736 17.9976 20.4004 16.7259 20.4004 15.3998C20.4004 14.0737 19.8736 12.8019 18.9359 11.8642C17.9982 10.9266 16.7265 10.3998 15.4004 10.3998C14.0743 10.3998 12.8025 10.9266 11.8649 11.8642C10.9272 12.8019 10.4004 14.0737 10.4004 15.3998C10.4004 16.7259 10.9272 17.9976 11.8649 18.9353C12.8025 19.873 14.0743 20.3998 15.4004 20.3998C16.7265 20.3998 17.9982 19.873 18.9359 18.9353ZM17.6233 13.7331C17.6233 13.8806 17.5647 14.0221 17.4604 14.1264L16.1859 15.3998L17.4604 16.6731C17.512 16.7248 17.553 16.7861 17.581 16.8536C17.6089 16.9211 17.6233 16.9934 17.6233 17.0664C17.6233 17.1395 17.6089 17.2118 17.581 17.2793C17.553 17.3468 17.512 17.4081 17.4604 17.4598C17.4087 17.5114 17.3474 17.5524 17.2799 17.5804C17.2124 17.6083 17.1401 17.6227 17.0671 17.6227C16.994 17.6227 16.9217 17.6083 16.8542 17.5804C16.7867 17.5524 16.7254 17.5114 16.6737 17.4598L15.4004 16.1853L14.1271 17.4598C14.0754 17.5114 14.0141 17.5524 13.9466 17.5804C13.8791 17.6083 13.8068 17.6227 13.7337 17.6227C13.6607 17.6227 13.5883 17.6083 13.5209 17.5804C13.4534 17.5524 13.392 17.5114 13.3404 17.4598C13.2887 17.4081 13.2478 17.3468 13.2198 17.2793C13.1919 17.2118 13.1775 17.1395 13.1775 17.0664C13.1775 16.9934 13.1919 16.9211 13.2198 16.8536C13.2478 16.7861 13.2887 16.7248 13.3404 16.6731L14.6148 15.3998L13.3404 14.1264C13.2361 14.0221 13.1775 13.8806 13.1775 13.7331C13.1775 13.5856 13.2361 13.4441 13.3404 13.3398C13.4447 13.2355 13.5862 13.1769 13.7337 13.1769C13.8813 13.1769 14.0227 13.2355 14.1271 13.3398L15.4004 14.6142L16.6737 13.3398C16.778 13.2355 16.9195 13.1769 17.0671 13.1769C17.2146 13.1769 17.3561 13.2355 17.4604 13.3398C17.5647 13.4441 17.6233 13.5856 17.6233 13.7331Z"
                            />
                          </svg>
                        </div>
                        <div>Delete</div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex justify-between">
                    <div className="service-title break-words">
                      {service.name}
                    </div>
                    <div className="service-active mr-5">
                      {/* <button className="px-2 py-1">
                      {" "}
                      {service.isActive ? (
                        <span>Active</span>
                      ) : (
                        <span>Draft</span>
                      )}{" "}
                    </button> */}
                    </div>
                  </div>

                  <div className="service-text mt-2">
                    {service?.description.slice(0, 200)}
                  </div>

                  <div className="service-time grid grid-cols-10 px-2 py-2   mt-3">
                    <div className="flex gap-2 col-span-8">
                      <div>
                        <svg
                          width="20"
                          height="20"
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
                      <div>Min-Time of Consulation</div>
                    </div>
                    <div className="flex justify-end">{service?.duration}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-3 s-i-v">
          {serviceInView && (
            <div>
              <div className="title break-words">{serviceInView?.name}</div>

              <div className="charges my-2 flex justify-between">
                <div className="charge-title">Consultation Charges:</div>
                <div className="charge">{serviceInView?.charges}</div>
              </div>

              <div className="service-time grid grid-cols-2  px-3 py-2 mt-3">
                <div className="flex gap-2">
                  <div>
                    <svg
                      width="20"
                      height="20"
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
                  <div>Min-Time of Consulation</div>
                </div>
                <div className="flex justify-end">
                  {serviceInView?.duration}
                </div>
              </div>

              <div className="service-details mt-5">
                <div className="title">Details</div>
                <div className="mt-2">{serviceInView?.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessServices;
