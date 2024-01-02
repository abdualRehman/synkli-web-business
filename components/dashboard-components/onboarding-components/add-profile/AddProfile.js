import { EnvelopeIcon } from "utills/svgs/EnvelopeIcon";
import { CameraIcon } from "../../../../utills/svgs/CameraIcon";
import "./css/addProfile.css";
import { useState } from "react";
import { CakeIcon } from "utills/svgs/CakeIcon";
import { Telephone } from "utills/svgs/Telephone";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleProfileImage, setLoader } from "store/global/globalReducer";
import {
  businessOwnerGetProfileThunk,
  updateUserProfileImageThunk,
} from "store/auth/slices";
import { SmallLoader } from "components/common/SmallLoader";
import { ErrorIcon } from "utills/svgs/ErrorIcon";
import pexels from "../../../../files/default.png.png";
import { formateDateTime } from "utills/moment";
import { BgPencilIcon } from "utills/svgs/BgPencilIcon";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { UserLargeIcon } from "utills/svgs/UserLargeIcon";
import { USER_TYPE } from "utills/globalVars";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { ImageCropper } from "global-components/ImageCropper";
import { DataURIToBlob } from "utills/dataValidation";
const AddProfile = ({ profileUpdated, toggleAddProfileSide }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const [isZoomed, setIsZoomed] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ownerData, setOwnerData] = useState(null);
  const [profileLoader, setProfileLoader] = useState(false);
  const [showCroper, setShowCroper] = useState(false);

  const saveProfile = (image) => {
    setCroppedImage(image);
    const file = DataURIToBlob(image);
    const formData = new FormData();

    formData.append("profile_image", file, "image.jpg");

    formData.append("uploaded_by", USER_TYPE);

    setProfileLoader(true);

    dispatch(updateUserProfileImageThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setSelectedImage(response.payload.image);
          dispatch(handleProfileImage(response.payload.image));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setProfileLoader(false);
      });
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Set the selected image in the state
        setSelectedFile(reader.result);
        // Reset the cropped image when a new image is selected
        setCroppedImage(null);
      };

      reader.readAsDataURL(file);
      setShowCroper(true);
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    setTimeout(() => {
      dispatch(businessOwnerGetProfileThunk())
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            setOwnerData(response.payload);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    }, 500);
  }, [dispatch, profileUpdated]);
  return (
    <div>
      {selectedFile && showCroper ? (
        <>
          <ImageCropper
            width={"120"}
            height={"120"}
            setShowCroper={setShowCroper}
            image={selectedFile}
            isCircular={true}
            handleCroppedImage={(image) => saveProfile(image)}
          />
        </>
      ) : (
        ""
      )}{" "}
      <div className="p-5 relative business-profile">
        <div className="flex justify-end">
          {/* <button
    
       className="update-business-btn px-2 py-2 rounded-md text-white"
     >
       Update 
     </button> */}
          <div
            onClick={toggleAddProfileSide}
            className="flex justify-center items-center scale-150 cursor-pointer"
          >
            <BgPencilIcon />
          </div>
        </div>

        <div className="onboarding-title mb-5">Profile</div>
        {isLoading ? (
          <div className="profile-loader">
            {" "}
            <SmallLoader />
          </div>
        ) : (
          <div>
            {ownerData && (
              <div>
                <div className="flex justify-center items-center">
                  {" "}
                  <div className="profile-image-container  ">
                    <div
                      className={`flex justify-center items-center h-full w-full`}
                    >
                      {profileLoader ? (
                        <SmallLoader />
                      ) : selectedImage ?? ownerData?.image ? (
                        <img
                          className="profile-image-edit"
                          src={selectedImage ?? ownerData?.image}
                          alt=""
                          onClick={() => ownerData?.image && setIsZoomed(true)}
                        />
                      ) : (
                        <div className="scale-50">
                          <UserLargeIcon />
                        </div>
                      )}
                    </div>
                    {isZoomed && (
                      <ZoomImage
                        src={ownerData?.image}
                        alt="Profile"
                        onClose={() => setIsZoomed(false)}
                      />
                    )}

                    <input
                      type="file"
                      accept=".jpg, .jpeg, .gif"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="image-input"
                    />

                    <label htmlFor="image-input">
                      <div className="camera-svg">
                        <svg
                          width="25"
                          height="25"
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
                {/* <div className="profile-images">
             <img
               className="profile-image"
               src={ownerData?.image ?? pexels}
               alt="MainImage"
             />
           </div> */}

                <div className="profile-info mt-3">
                  <div className="profile-title">{ownerData.first_name}</div>

                  <div className="profile-flex mt-2">
                    <div className="flex gap-2">
                      <div className="flex justify-center items-center">
                        <EnvelopeIcon />
                      </div>
                      <div>{ownerData.email}</div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="flex justify-center items-center">
                        <CakeIcon />
                      </div>
                      <div>
                        {ownerData.date_of_birth ? (
                          <span>
                            {formateDateTime(ownerData?.date_of_birth)}
                          </span>
                        ) : (
                          <span className="text-gray-500 flex gap-2 items-center">
                            {" "}
                            <span onClick={toggleAddProfileSide}>
                              Please add date of birth
                            </span>
                            <span></span>{" "}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="flex justify-center items-center">
                        <Telephone />
                      </div>
                      <div>
                        {ownerData.phone_number ? (
                          <span>{ownerData.phone_number}</span>
                        ) : (
                          <span className="text-gray-500 flex gap-2 items-center">
                            <span onClick={toggleAddProfileSide}>
                              Please add personal mobile number
                            </span>
                            <span></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProfile;
