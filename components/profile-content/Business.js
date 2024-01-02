import { EyeIcon } from "utills/svgs/EyeIcon";
import "./css/business.css";
import { useDispatch, useSelector } from "react-redux";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { ProfileSkeleton } from "./profile-skeleton/ProfileSkeleton";
import { EnvelopeIcon } from "utills/svgs/EnvelopeIcon";
import { Telephone } from "utills/svgs/Telephone";
import { LocationPin } from "utills/svgs/LocationPin";
import { ErrorIcon } from "utills/svgs/ErrorIcon";
import { setSideLoader } from "store/global/globalReducer";
import { deactivateUserThunk } from "store/auth/slices";
import {
  ACCESS_TOKEN,
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  PERMISSIONS_MESSAGE,
  REFRESH_TOKEN,
} from "utills/globalVars";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { BgPencilIcon } from "utills/svgs/BgPencilIcon";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { useState } from "react";
import ConfirmationModal from "utills/confirmationModal";
import { toastHandler } from "responseHanlder";

const Business = ({ toggleUpdateBusiness }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);
  const { businessLogo } = useSelector((state) => state.global);
  const { isLoading } = useSelector((state) => state.global);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const { data: businessData } = useSelector(
    (state) => state.getBusinessprofile
  );

  const handleDelete = () => {
    setIsConfirmationOpen(false);
    dispatch(setSideLoader(true));
    dispatch(deactivateUserThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          localStorage.setItem(ACCESS_TOKEN, "");
          localStorage.setItem(REFRESH_TOKEN, "");
          localStorage.setItem(BUSINESS_ID, "");
          navigate("/signup");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  const deleteBusiness = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setIsConfirmationOpen(true);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  const editBusiness = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      toggleUpdateBusiness();
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };
  return (
    <div className="md:mx-10 mx-5 py-3 relativw">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="business-label">Businesses</div>
      {isLoading ? (
        <ProfileSkeleton numOfSlides={5} />
      ) : (
        <div className="business-card relative business-infor-container mt-2 shadow">
          <div className=" absolute z-10 right-5 top-5 flex gap-2">
            <div
              onClick={editBusiness}
              className="flex justify-center items-center cursor-pointer"
            >
              <BgPencilIcon />
            </div>

            <div onClick={deleteBusiness} className="cursor-pointer">
              <BgDeleteIcon />
            </div>
          </div>
          <div className=" business-infor-div1 relative">
            <div className="my-business-img-wrap">
              <img
                src={businessLogo ?? businessData?.logo}
                alt="business"
                className="business-img-wrap"
                srcset=""
                onClick={() => businessData?.logo && setIsZoomed(true)}
              />
            </div>
          </div>
          {isZoomed && (
            <ZoomImage
              src={businessData?.logo}
              alt="Profile"
              onClose={() => setIsZoomed(false)}
            />
          )}

          <div className="business-infor-div2 relative">
            <div className="">
              <div className=" top-business ">
                <div className="business-title pt-3">
                  {businessData?.name ?? "No business name"}
                </div>
              </div>
              <div className="bottom-business">
                <div className="flex gap-2 items-center">
                  <div>
                    <EnvelopeIcon />
                  </div>
                  <div>{businessData?.email}</div>
                </div>

                <div className="flex gap-2 items-center">
                  <div>
                    <Telephone />
                  </div>
                  <div>{businessData?.phone_number}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 22C17.299 22 22 17.299 22 11.5C22 5.70101 17.299 1 11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22Z"
                        stroke="black"
                        stroke-width="1.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.69922 8H21.2992M1.69922 15H21.2992M10.9159 1C8.95045 4.14955 7.90846 7.78751 7.90846 11.5C7.90846 15.2125 8.95045 18.8505 10.9159 22M12.0826 1C14.048 4.14955 15.09 7.78751 15.09 11.5C15.09 15.2125 14.048 18.8505 12.0826 22"
                        stroke="black"
                        stroke-width="1.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-blue-900 cursor-pointer">
                      <a href={businessData?.website} target="_blank">
                        {" "}
                        {businessData?.website}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 19 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_1344_954"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="19"
                        height="21"
                      >
                        <path
                          d="M16.2 6.88905V1.95C16.2 1.69804 16.0999 1.45641 15.9218 1.27825C15.7436 1.10009 15.502 1 15.25 1H1.95C1.69804 1 1.45641 1.10009 1.27825 1.27825C1.10009 1.45641 1 1.69804 1 1.95V19.05C1 19.302 1.10009 19.5436 1.27825 19.7218C1.45641 19.8999 1.69804 20 1.95 20H6.7"
                          stroke="white"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.80273 5.75H10.9777M4.80273 9.075H7.17773"
                          stroke="white"
                          stroke-width="1.4"
                          stroke-linecap="round"
                        />
                        <path
                          d="M8.59961 15.25C8.59961 17.8734 10.7263 20 13.3496 20C15.973 20 18.0996 17.8734 18.0996 15.25C18.0996 12.6266 15.973 10.5 13.3496 10.5C10.7263 10.5 8.59961 12.6266 8.59961 15.25Z"
                          fill="white"
                          stroke="white"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3496 16.2007V17.6257"
                          stroke="black"
                          stroke-width="1.4"
                          stroke-linecap="round"
                        />
                        <path
                          d="M13.3504 14.2999C13.8751 14.2999 14.3004 13.8746 14.3004 13.3499C14.3004 12.8252 13.8751 12.3999 13.3504 12.3999C12.8257 12.3999 12.4004 12.8252 12.4004 13.3499C12.4004 13.8746 12.8257 14.2999 13.3504 14.2999Z"
                          fill="black"
                        />
                      </mask>
                      <g mask="url(#mask0_1344_954)">
                        <path
                          d="M-2.80273 -0.899902H19.9973V21.9001H-2.80273V-0.899902Z"
                          fill="url(#paint0_linear_1344_954)"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_1344_954"
                          x1="9.71596"
                          y1="-0.616749"
                          x2="9.69889"
                          y2="21.9001"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div>748 593 2134</div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <LocationPin />
                  </div>
                  <div>
                    {businessData?.address ? (
                      <span>{businessData.address}</span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {" "}
                        No address found <ErrorIcon />{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Business;
