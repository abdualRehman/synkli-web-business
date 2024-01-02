import "./css/addBusiness.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLoader } from "store/global/globalReducer";
import {
  getBusinessprofileThunk,
  uploadBusinessLogoThunk,
} from "store/auth/slices";
import { SmallLoader } from "components/common/SmallLoader";
import { EnvelopeIcon } from "utills/svgs/EnvelopeIcon";
import { Telephone } from "utills/svgs/Telephone";
import { LocationPin } from "utills/svgs/LocationPin";
import { GlobIcon } from "utills/svgs/GlobIcon";
import { ErrorIcon } from "utills/svgs/ErrorIcon";
import { USER_TYPE } from "utills/globalVars";
import pexels from "../../../../files/pexels.jpg";
import { UserLargeIcon } from "utills/svgs/UserLargeIcon";
import { BgPencilIcon } from "utills/svgs/BgPencilIcon";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import TruncateText from "global-components/StringSlicer";
import { ImageCropper } from "global-components/ImageCropper";
import { DataURIToBlob, dataURIToBlobTwo } from "utills/dataValidation";

const AddBusiness = ({ isBusinessUpdated, toggleBusinessSide }) => {
  const dispatch = useDispatch();
  const [businessData, setBusinessData] = useState("");

  const isLoading = useSelector((state) => state.global.isLoading);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCroper, setShowCroper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [newCroped, setNewCroped] = useState(null);
  const fetchBusiness = () => {
    dispatch(setLoader(true));
    dispatch(getBusinessprofileThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setBusinessData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const saveImage = (image) => {
    const file = dataURIToBlobTwo(image, "image.jpg");
    const formData = new FormData();

    // setNewCroped(file);
    console.log(file.type, "fileeeee");

    formData.append("business_logo", file, croppedImage?.name);

    formData.append("uploaded_by", USER_TYPE);

    setUpdateLoader(true);
    dispatch(uploadBusinessLogoThunk(formData))
      .then((response) => {
        // setSelectedImage(response.payload.logo);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setUpdateLoader(false);
        fetchBusiness();
      });
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setCroppedImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Set the selected image in the state
        setSelectedFile(reader.result);
        // Reset the cropped image when a new image is selected
      };

      reader.readAsDataURL(file);
      setShowCroper(true);
    }
    // const formData = new FormData();
    // formData.append("uploaded_by", USER_TYPE);
    // formData.append("business_logo", file);
    // setUpdateLoader(true);
    // dispatch(uploadBusinessLogoThunk(formData))
    //   .then((response) => {
    //     console.log(response.payload);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setUpdateLoader(false);
    //     fetchBusiness();
    //   });
  };

  useEffect(() => {
    fetchBusiness();
  }, [dispatch, isBusinessUpdated]);

  return (
    <div>
      {/* <div>
        <img src={selectedImage} alt="d" />
      </div> */}

      {selectedFile && showCroper ? (
        <>
          <ImageCropper
            width={"120"}
            height={"120"}
            setShowCroper={setShowCroper}
            image={selectedFile}
            isCircular={true}
            handleCroppedImage={(image) => saveImage(image)}
          />
        </>
      ) : (
        ""
      )}
      <div className="p-5 relative business-profile">
        <div className="flex justify-end">
          <div
            onClick={toggleBusinessSide}
            className="flex justify-center items-center scale-150 cursor-pointer"
          >
            <BgPencilIcon />
          </div>
        </div>
        <div className="onboarding-title mb-5">Business Profile</div>
        {isLoading ? (
          <div className="profile-loader">
            {" "}
            <SmallLoader />{" "}
          </div>
        ) : (
          <div>
            {businessData && (
              <div>
                <div className="flex justify-center items-center ">
                  {" "}
                  <div className="profile-images border justify-center items-center">
                    {updateLoader ? (
                      <div className="w-full h-full flex justify-center items-center">
                        {" "}
                        <SmallLoader />
                      </div>
                    ) : businessData.logo ? (
                      <img
                        src={businessData.logo}
                        alt="profile"
                        className="profile-image"
                        onClick={() => businessData.logo && setIsZoomed(true)}
                      />
                    ) : (
                      <div className="user-icon-default">
                        <DefaultUserIcon />
                      </div>
                    )}
                    {isZoomed && (
                      <ZoomImage
                        src={businessData.logo}
                        alt="Profile"
                        onClose={() => setIsZoomed(false)}
                      />
                    )}

                    <input
                      disabled={updateLoader ? true : false}
                      type="file"
                      accept=".jpg, .jpeg"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="image-input"
                    />

                    <label htmlFor="image-input">
                      <div className="profile-camera-svg">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 46 46"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="23"
                            cy="23"
                            r="21.5"
                            fill="#B695F8"
                            stroke="white"
                            stroke-width="3"
                          />
                          <path
                            d="M32.2308 15.1186H29.0346L27.4654 12.7534C27.3819 12.624 27.2673 12.518 27.1321 12.445C26.997 12.3721 26.8457 12.3346 26.6923 12.336H19.3077C19.1543 12.3346 19.003 12.3721 18.8679 12.445C18.7327 12.518 18.6181 12.624 18.5346 12.7534L16.9654 15.1186H13.7692C13.0357 15.1216 12.3331 15.4158 11.8144 15.937C11.2958 16.4581 11.003 17.1641 11 17.9012V30.8867C11.003 31.6237 11.2958 32.3297 11.8144 32.8509C12.3331 33.3721 13.0357 33.6662 13.7692 33.6693H32.2308C32.9643 33.6662 33.6669 33.3721 34.1856 32.8509C34.7042 32.3297 34.997 31.6237 35 30.8867V17.9012C34.997 17.1641 34.7042 16.4581 34.1856 15.937C33.6669 15.4158 32.9643 15.1216 32.2308 15.1186ZM33.1538 30.8867C33.1538 31.1327 33.0566 31.3686 32.8835 31.5425C32.7104 31.7165 32.4756 31.8142 32.2308 31.8142H13.7692C13.5244 31.8142 13.2896 31.7165 13.1165 31.5425C12.9434 31.3686 12.8462 31.1327 12.8462 30.8867V17.9012C12.8462 17.6552 12.9434 17.4193 13.1165 17.2453C13.2896 17.0714 13.5244 16.9736 13.7692 16.9736H17.4615C17.6149 16.9751 17.7662 16.9376 17.9014 16.8646C18.0365 16.7916 18.1511 16.6856 18.2346 16.5563L19.8038 14.191H26.1962L27.7654 16.5563C27.8489 16.6856 27.9635 16.7916 28.0986 16.8646C28.2338 16.9376 28.3851 16.9751 28.5385 16.9736H32.2308C32.4756 16.9736 32.7104 17.0714 32.8835 17.2453C33.0566 17.4193 33.1538 17.6552 33.1538 17.9012V30.8867ZM23 18.8287C21.9959 18.8287 21.0143 19.1279 20.1794 19.6885C19.3445 20.249 18.6938 21.0458 18.3095 21.9779C17.9253 22.9101 17.8247 23.9358 18.0206 24.9254C18.2165 25.915 18.7001 26.824 19.4101 27.5374C20.1201 28.2509 21.0247 28.7367 22.0095 28.9336C22.9944 29.1304 24.0152 29.0294 24.9429 28.6433C25.8705 28.2572 26.6634 27.6033 27.2213 26.7644C27.7792 25.9254 28.0769 24.9391 28.0769 23.9302C28.0769 22.5772 27.542 21.2796 26.5899 20.3229C25.6378 19.3662 24.3465 18.8287 23 18.8287ZM23 27.1765C22.361 27.1765 21.7364 26.9861 21.2051 26.6294C20.6738 26.2727 20.2597 25.7657 20.0152 25.1725C19.7706 24.5793 19.7066 23.9266 19.8313 23.2968C19.956 22.6671 20.2637 22.0886 20.7155 21.6346C21.1673 21.1806 21.743 20.8714 22.3697 20.7462C22.9964 20.6209 23.646 20.6852 24.2364 20.9309C24.8267 21.1766 25.3313 21.5927 25.6863 22.1266C26.0413 22.6604 26.2308 23.2881 26.2308 23.9302C26.2277 24.7902 25.8864 25.6142 25.2811 26.2223C24.6759 26.8305 23.8559 27.1735 23 27.1765Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="profile-info mt-3">
                  <div className="my-2 flex justify-center items-center">
                    {!businessData?.logo && (
                      <span onClick={toggleBusinessSide}>
                        Please add business logo
                      </span>
                    )}
                  </div>
                  <div className="profile-title">
                    {businessData.name ? (
                      <span>{businessData.name}</span>
                    ) : (
                      <span className="text-gray-500 flex gap-2 items-center">
                        <span onClick={toggleBusinessSide}>
                          Please add business name
                        </span>
                        <span></span>
                      </span>
                    )}
                  </div>

                  <div className="profile-flex mt-2">
                    <div className="flex gap-2">
                      <div className="flex justify-center items-center">
                        <EnvelopeIcon />
                      </div>
                      <div>
                        {businessData.email ? (
                          <span>{businessData.email}</span>
                        ) : (
                          <span className="text-gray-500 flex gap-2 items-center">
                            <span onClick={toggleBusinessSide}>
                              Please add business email
                            </span>
                            <span></span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <div className="flex justify-center items-center">
                        <Telephone />
                      </div>
                      <div>
                        {" "}
                        {businessData.phone_number ? (
                          <span>{businessData.phone_number}</span>
                        ) : (
                          <span className="text-gray-500 flex gap-2 items-center">
                            <span onClick={toggleBusinessSide}>
                              Please add phone number{" "}
                            </span>
                            <span></span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <div className="flex justify-center items-center">
                        <GlobIcon />
                      </div>
                      <div>
                        <a
                          disabled={!businessData?.website ? true : false}
                          href={`https://${businessData.website}`}
                          className="text-blue-900"
                          target="_blank"
                        >
                          {" "}
                          {businessData.website ? (
                            <span>{businessData.website}</span>
                          ) : (
                            <span className="text-gray-500 flex gap-2 items-center">
                              <span onClick={toggleBusinessSide}>
                                Please add website
                              </span>
                              <span></span>
                            </span>
                          )}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <div className="flex justify-center items-center">
                        <LocationPin />
                      </div>
                      <div>
                        {" "}
                        {businessData.address ? (
                          <span>{businessData.address}</span>
                        ) : (
                          <span className="text-gray-500 flex gap-2 items-center">
                            <span onClick={toggleBusinessSide}>
                              Please add address
                            </span>
                            <span></span>
                          </span>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bio mt-5">
                  <div className="title">Bio</div>
                  <div className="bio-p mt-2 break-words">
                    {businessData.description ? (
                      <span>
                        <TruncateText
                          index={1}
                          text={businessData?.description}
                          maxLength={70}
                        />
                      </span>
                    ) : (
                      <span toggleBusinessSide={toggleBusinessSide}>
                        Please add bio
                      </span>
                    )}
                  </div>
                </div>{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBusiness;
