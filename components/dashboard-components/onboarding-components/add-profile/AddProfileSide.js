import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import "./css/addProfileSide.css";

import { SmallLoader } from "components/common/SmallLoader";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { toastHandler } from "responseHanlder";
import {
  businessOwnerAddProfileThunk,
  updateUserProfileImageThunk,
} from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";
import { SideTimes } from "utills/svgs/SideTimes";
import { UserLargeIcon } from "utills/svgs/UserLargeIcon";

import { useOwnerProfile } from "Hooks/useOwnerProfile";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import DatePickerComponent from "global-components/DatePicker";
import { TOAST_TYPE_SUCCESS, USER_TYPE } from "utills/globalVars";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { handleProfileImage } from "store/global/globalReducer";
import {
  CropperRef,
  Cropper,
  CircleStencil,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { ImageCropper } from "global-components/ImageCropper";
import { DataURIToBlob } from "utills/dataValidation";

const timestamp = new Date().toISOString();
const AddProfileSide = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { getOwnerProfile } = useOwnerProfile();
  const { data: ownerProfile } = useSelector(
    (state) => state.businessOwnerGetProfile
  );

  const [selectedFile, setSelectedFile] = useState(null);
  console.log(ownerProfile);
  function hideSide() {
    props.toggleAddProfile();
  }

  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
  );

  const [profileLoader, setProfileLoader] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [name, setName] = useState(ownerProfile?.first_name);
  const [dob, setDob] = useState("");
  const [phoneNo, setPhoneNo] = useState(ownerProfile?.phone_number);
  const { isLoading } = useSelector((state) => state.global);

  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [file, setFile] = useState("");
  const [showCroper, setShowCroper] = useState(false);

  const saveProfile = (image) => {
    // const binaryString = atob(croppedImage);
    setCroppedImage(image);
    // // Step 2: Create a Blob
    // const binaryData = new Uint8Array(binaryString.length);
    // for (let i = 0; i < binaryString.length; i++) {
    //   binaryData[i] = binaryString.charCodeAt(i);
    // }
    // const blob = new Blob([binaryData], { type: "image/jpeg" });

    // // Step 3: Create File from Blob
    // const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    // console.log(file, "blob");

    const file = DataURIToBlob(image);
    const formData = new FormData();

    formData.append("profile_image", file, "image.jpg");

    formData.append("uploaded_by", USER_TYPE);
    // formData.append("profile_image", file);
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
    setFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Set the selected image in the state
        setSelectedImage(reader.result);
        // Reset the cropped image when a new image is selected
        setCroppedImage(null);
      };

      reader.readAsDataURL(file);
      setShowCroper(true);
    }

    console.log("blobfilke");
    return;

    const formData = new FormData();
    formData.append("uploaded_by", USER_TYPE);
    formData.append("profile_image", file);
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

  const handleName = (value) => {
    if (/\d/.test(value)) {
      return;
    } else {
      setName(value);
    }
  };
  const handleSubmit = () => {
    const formData = {
      first_name: name || ownerProfile?.name,
      last_name: "",
      date_of_birth: dob || ownerProfile?.date_of_birth,
      phone_number: phoneNo || ownerProfile?.phone_number,
    };

    dispatch(setLoader(true));
    dispatch(businessOwnerAddProfileThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          props.toggleAddProfile();
          toastHandler("Profile Updated Successfully", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    getOwnerProfile();
  }, []);

  const handlePhoneNo = (value) => {
    if (value?.length < 16) {
      setPhoneNo(value);
    }
    // if (value.length > 15) {
    //   console.log(value?.length, value, "vallength", "exceed");
    //   return;
    // } else if (!value?.length > 15) {
    //   if (value.includes("e")) {
    //     return;
    //   }
    //   if (/\D/.test(value)) {
    //     return;
    //   } else {
    //     setPhoneNo(value?.slice(0, 15));
    //   }
    // } else {
    //   return;
    // }
  };

  console.log(croppedImage, "croped");

  return (
    <div className="add-p-side grid grid-cols-6 ">
      <div className="left-side col-span-4 ">
        {selectedImage && showCroper ? (
          <>
            <ImageCropper
              width={"120"}
              height={"120"}
              setShowCroper={setShowCroper}
              image={selectedImage}
              isCircular={true}
              handleCroppedImage={(image) => saveProfile(image)}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="right-side col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div
            onClick={hideSide}
            className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
          >
            <SideTimes />
          </div>
          <div> </div>
          {/* {selectedFile && (
            <Cropper
              src={image}
              onChange={atChange}
              stencilComponent={CircleStencil}
              stencilProps={{
                aspectRatio: 4 / 4,
                movable: true,
                resizable: true,
              }}
              className={"cropper"}
            />
          )}
          {console.log(selectedImage, "selectedFile")} */}
          <div>
            <div className="add-detail pt-10 px-5">
              <div className="title">Complete Profile</div>
              <div className="flex justify-center items-center">
                {" "}
                <div className="profile-image-container mt-5 ">
                  <div
                    className={`flex justify-center items-center h-full w-full`}
                  >
                    {profileLoader ? (
                      <SmallLoader />
                    ) : selectedImage ?? ownerProfile?.image ? (
                      <img
                        className="profile-image-edit"
                        src={selectedImage ?? ownerProfile?.image}
                        alt=""
                        onClick={() => ownerProfile?.image && setIsZoomed(true)}
                      />
                    ) : (
                      <div className="scale-50">
                        <UserLargeIcon />
                      </div>
                    )}
                  </div>
                  {isZoomed && (
                    <ZoomImage
                      src={ownerProfile?.image}
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
              <div className="profile-info-container add-ann-form mt-3 mr-4">
                <div>
                  <label>User Name</label>
                </div>
                <div className="mt-1">
                  <input
                    onChange={(e) => handleName(e.target.value)}
                    type="text"
                    maxLength="60"
                    className="px-3 rounded-xl family-input"
                    placeholder="Name"
                    value={name}
                  />
                </div>

                <div className="mt-2">
                  <label>Date of Birth</label>
                </div>
                <div className="mt-1">
                  <DatePickerComponent
                    type="date"
                    isOpen={isOpen}
                    date={dob || ownerProfile?.date_of_birth}
                    setVisible={(value) => setIsOpen(value)}
                    onDateChange={(date) => {
                      setIsOpen(false);
                      setDob(date);
                    }}
                  />{" "}
                  {/* <div className="pick-date-contain">
                    <div className="selected-date px-3 flex items-center">
                      Select
                    </div>
                    <div>
                      <Calendar
                        // Other props...
                        styles={customStyles}
                      />
                    </div>
                  </div> */}
                  <div>{/* <DateRangePicker /> */}</div>
                  {/* <input
                    onChange={(e) => setDob(e.target.value)}
                    type="date"
                    className="px-3 rounded-xl family-input"
                  /> */}
                </div>

                <div className="mt-2">
                  <label>Personal Mobile No</label>
                </div>
                <div className="mt-1">
                  <input
                    value={phoneNo}
                    onChange={(e) => handlePhoneNo(e.target.value)}
                    type="number"
                    maxLength={15}
                    placeholder="Phone number"
                    className="px-3 rounded-xl family-input"
                  />
                </div>
              </div>
              <div className="flex justify-center  btn-wrap mt-20 max-lg:mt-48">
                <button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="add-btn text-white  px-16 py-2 rounded-md"
                >
                  {isLoading ? (
                    <span>
                      <SmallLoaderWhite />{" "}
                    </span>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>{" "}
            </div>{" "}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProfileSide;
