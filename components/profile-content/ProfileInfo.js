import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ripples from "react-ripples";
import { BluepencilIcon } from "../../utills/svgs/BluepencilIcon";
import { CakeIcon } from "../../utills/svgs/CakeIcon";
import { CameraIcon } from "../../utills/svgs/CameraIcon";
import { EnvelopeIcon } from "../../utills/svgs/EnvelopeIcon";

import "react-toastify/dist/ReactToastify.css";
import { toastHandler } from "responseHanlder";
import {
  businessOwnerAddProfileThunk,
  updateUserProfileImageThunk,
} from "store/auth/slices";
import {
  handleProfileImage,
  handleProfileUpdating,
  setLoader,
} from "store/global/globalReducer";
import {
  ERROR_TYPE_ERROR,
  PERMISSIONS_MESSAGE,
  USER_TYPE,
} from "utills/globalVars";
import { ProfileSkeleton } from "./profile-skeleton/ProfileSkeleton";

import DatePickerComponent from "global-components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { formateDateTime } from "utills/moment";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { ImageCropper } from "global-components/ImageCropper";
import { DataURIToBlob } from "utills/dataValidation";
import { SmallLoader } from "components/common/SmallLoader";

const ProfileInfo = ({ ownerData, handleGetOwnerProfile }) => {
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [dateEditor, setDateEditor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nameEditor, setNameEditor] = useState(false);
  const { profileUpdating } = useSelector((state) => state.global);
  const [image, setImage] = useState(null);
  const isLoading = useSelector((state) => state.global.isLoading);
  const [date, setDate] = useState("");
  const [profileLoader, setProfileLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const [imageLoader, setImageLoader] = useState(false);
  const { profileImg } = useSelector((state) => state.global);

  const [showCroper, setShowCroper] = useState(false);
  const [file, setFile] = useState("");

  const formatDate = (date) => {
    if (!date) return "";

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const newformData = {
      first_name: formData.name || ownerData?.first_name,
      date_of_birth: formData.date || ownerData?.date_of_birth,
    };

    // dispatch(setLoader(true));
    setProfileLoader(true);
    dispatch(businessOwnerAddProfileThunk(newformData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler("Profile Updated Successfully", "success");
          setShowEditor(false);
          setDateEditor(false);
          setNameEditor(false);
          dispatch(handleProfileUpdating(!profileUpdating));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setProfileLoader(false);
        // dispatch(setLoader(false));
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setFile(url);

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Set the selected image in the state
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
      setShowCroper(true);
    }

    // return;
    // const formData = new FormData();
    // formData.append("uploaded_by", USER_TYPE);
    // formData.append("profile_image", file);

    // dispatch(setLoader(true));
    // dispatch(updateUserProfileImageThunk(formData))
    //   .then((response) => {
    //     console.log(response.payload);
    //     if (response.payload) {
    //       setFile(response.payload.image);
    //       handleGetOwnerProfile();
    //       dispatch(handleProfileImage(response.payload.image));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     dispatch(setLoader(false));
    //   });
  };

  function toggleEditor() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setShowEditor(!showEditor);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  }

  function toggleDateEditor() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setDateEditor(!dateEditor);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  }

  function toggleEditors() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      handleSubmit();
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  }

  const closeEditors = () => {
    setShowEditor(false);
    setNameEditor(false);
    setDateEditor(false);
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, ["date"]: date }));
  };

  const saveProfile = (image) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      const file = DataURIToBlob(image);
      const formData = new FormData();

      formData.append("profile_image", file, "image.jpg");
      formData.append("uploaded_by", USER_TYPE);

      // dispatch(setLoader(true));
      setImageLoader(true);
      dispatch(updateUserProfileImageThunk(formData))
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            setFile(response.payload.image);
            // handleGetOwnerProfile();
            dispatch(handleProfileImage(response.payload.image));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // dispatch(setLoader(false));
          setImageLoader(false);
        });
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  return (
    <div className="md:mx-10 mx-5 mt-2">
      {image && showCroper ? (
        <>
          <ImageCropper
            width={"120"}
            height={"120"}
            setShowCroper={setShowCroper}
            image={image}
            isCircular={true}
            handleCroppedImage={(image) => saveProfile(image)}
          />
        </>
      ) : (
        ""
      )}
      <div className="profile-information shadow py-3">
        {isLoading || profileLoader ? (
          <ProfileSkeleton numOfSlides={2} />
        ) : (
          <div>
            <div className="relative md:flex gap-3 md:flex-row flex-col  items-center">
              <div>
                <div className="profile-image-wrapper">
                  <div className="profile-camera absolute bottom-0 cursor-pointer right-0">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="image-input"
                    />

                    <label htmlFor="image-input" className="cursor-pointer">
                      <CameraIcon />
                    </label>
                  </div>

                  {imageLoader ? (
                    <div className="flex justify-center items-center h-full w-full">
                      <SmallLoader />{" "}
                    </div>
                  ) : ownerData?.image ? (
                    <img
                      src={profileImg ?? ownerData?.image}
                      alt="profile-img"
                      className="profile-image"
                      srcset=""
                      onClick={() => ownerData?.image && setIsZoomed(true)}
                    />
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        top: " 50%",
                        left: " 50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <svg
                        width="20"
                        height="31"
                        viewBox="0 0 50 71"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M49.9704 48.9217L49.9652 53.9834L49.9674 54.0234C50.2831 59.7523 48.2988 63.8738 44.3317 66.639C40.2608 69.4766 33.9361 71 25.3966 71C16.8887 71 10.512 69.4981 6.30189 66.6765C2.18335 63.9163 0 59.8037 0 54.1209V48.9217C0 44.1281 3.8183 40.2734 8.49025 40.2734H41.4802C46.1516 40.2734 49.9696 44.1288 49.9704 48.9217ZM41.4802 44.1456H8.49025C5.86812 44.1456 3.7734 46.3012 3.7734 48.9217V54.1209C3.7734 56.2353 4.19568 58.1665 5.12657 59.8617C6.05978 61.5612 7.46101 62.9447 9.29711 64.0241C12.9184 66.1529 18.2788 67.1278 25.3966 67.1278C32.4751 67.1278 37.7538 66.1786 41.2431 64.0462C43.0188 62.961 44.3417 61.5626 45.1763 59.8393C46.0013 58.1358 46.3067 56.203 46.197 54.0947V48.9217C46.197 46.3012 44.1023 44.1456 41.4802 44.1456Z"
                          fill="#979797"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M24.9991 0C33.3196 0 40.0956 6.86113 40.0956 15.3633C40.0956 23.8655 33.3196 30.7266 24.9991 30.7266C16.6787 30.7266 9.90265 23.8655 9.90265 15.3633C9.90265 6.86113 16.6787 0 24.9991 0ZM24.9991 3.87223C18.7285 3.87223 13.6761 9.03421 13.6761 15.3633C13.6761 21.6924 18.7285 26.8544 24.9991 26.8544C31.2698 26.8544 36.3222 21.6924 36.3222 15.3633C36.3222 9.03421 31.2698 3.87223 24.9991 3.87223Z"
                          fill="#979797"
                        />
                      </svg>
                    </div>
                  )}
                  {isZoomed && (
                    <ZoomImage
                      src={profileImg ?? ownerData?.image}
                      alt="Profile"
                      onClose={() => setIsZoomed(false)}
                    />
                  )}
                </div>
              </div>
              <div className="md:flex md:flex-col gap-3 md:mt-0 mt-3">
                {!nameEditor ? (
                  <div className=" flex gap-2 items-center">
                    <div className="profile-names">
                      {ownerData?.first_name} {ownerData?.last_name}
                    </div>
                    <div
                      className=" cursor-pointer"
                      onClick={() => setNameEditor(!nameEditor)}
                    >
                      <BluepencilIcon />
                    </div>
                  </div>
                ) : (
                  <div className="profile-emails ">
                    <div className="edit-input-wrapper relative">
                      <input
                        onChange={handleInputChange}
                        value={formData.name || ownerData?.first_name}
                        name="name"
                        type="text"
                        maxLength="60"
                        className="edit-input px-7"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                )}

                <div className="md:flex gap-5 items-center  ">
                  <div>
                    <div className="profile-emails">
                      <div className="flex gap-2">
                        <div className="flex justify-center items-center">
                          <EnvelopeIcon />
                        </div>
                        <div>{ownerData?.email}</div>
                        <div
                          onClick={toggleEditor}
                          className="flex justify-center cursor-pointer items-center"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className=" ">
                    {" "}
                    {!dateEditor ? (
                      <div className="profile-dates ">
                        <div className="flex gap-2">
                          <div className="flex justify-center items-center">
                            <CakeIcon />
                          </div>
                          <div>
                            {ownerData?.date_of_birth &&
                              formateDateTime(ownerData?.date_of_birth)}
                          </div>
                          <div
                            onClick={toggleDateEditor}
                            className="flex cursor-pointer justify-center items-center"
                          >
                            <BluepencilIcon />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <DatePickerComponent
                        type="date"
                        isOpen={isOpen}
                        date={formData.date || ownerData?.date_of_birth}
                        setVisible={(value) => setIsOpen(value)}
                        onDateChange={(date) => handleDateChange(date)}
                      />
                    )}{" "}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div>
              {showEditor || dateEditor || nameEditor ? (
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    onClick={closeEditors}
                    className="edit-cancel-btn px-5 py-2"
                  >
                    Cancel
                  </button>
                  <Ripples during={2000} color="#333333">
                    <button
                      onClick={toggleEditors}
                      className="edit-save-btn px-7 py-2"
                    >
                      Save
                    </button>
                  </Ripples>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
