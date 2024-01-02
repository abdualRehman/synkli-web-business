import { motion } from "framer-motion";
import Autocomplete from "react-google-autocomplete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { addBusinessThunk, uploadBusinessLogoThunk } from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";
import { SideTimes } from "utills/svgs/SideTimes";
import {
  validateAustralianPhoneNumber,
  validateEmail,
  validateWebLink,
} from "../../../../utills/FormValidation";
import "./css/addBusiness.css";

import { useBusinessProfile } from "Hooks/useBusinessProfile";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PLACES_API_KEY, TOAST_TYPE_ERROR, USER_TYPE } from "utills/globalVars";
import { SmallLoader } from "components/common/SmallLoader";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import isValidABN from "is-valid-abn";

import { UserLargeIcon } from "utills/svgs/UserLargeIcon";
import { PickAddress } from "global-components/PickAddress";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { DefaultUserIcon } from "utills/svgs/DefaultUserIcon";
import {
  DataURIToBlob,
  countWords,
  getFirst250Words,
  getFirstWords,
} from "utills/dataValidation";
import { ImageCropper } from "global-components/ImageCropper";
import { useGetBusinessProfile } from "components/workplace-content/tasks-pages/task-details/hooks/useGetBusinessProfile";
const AddBusinessSide = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchBusiness } = useBusinessProfile();
  const { data: businessProfile } = useSelector(
    (state) => state.getBusinessprofile
  );

  const isLoading = useSelector((state) => state.global.isLoading);

  const business_id = localStorage.getItem("business_id");

  function hideSide() {
    props.toggleBusinessSide();
  }

  const [businessName, setBusinessName] = useState(businessProfile?.name);
  const [email, setEmail] = useState(businessProfile?.email ?? "");
  const [phoneNo, setPhoneNo] = useState(businessProfile?.phone_number);
  const [abn, setAbn] = useState(businessProfile?.abn);
  const [weblink, setWeblink] = useState(businessProfile?.website);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [businessLoader, setBusinessLoader] = useState(false);
  const [address, setAddress] = useState(businessProfile?.address);
  const [bio, setBio] = useState(businessProfile?.description);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [bioLength, setBioLength] = useState(
    businessProfile?.description ? countWords(businessProfile?.description) : 0
  );

  const [croppedImage, setCroppedImage] = useState(null);

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
      setShowCropper(true);
    }

    // const formData = new FormData();
    // formData.append("uploaded_by", USER_TYPE);
    // formData.append("business_logo", file);

    // setBusinessLoader(true);
    // dispatch(uploadBusinessLogoThunk(formData))
    //   .then((response) => {
    //     setSelectedImage(response.payload.logo);
    //     console.log(response.payload);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //     setBusinessLoader(false);
    //   });
  };

  const handleBio = (value) => {
    const wordsLength = countWords(value);
    if (wordsLength <= 250) {
      setBioLength(countWords(value));

      setBio(value);
    }
  };

  const handlePastBio = (e) => {
    const value = e.target.value;
    if (value) {
      const countedInput = countWords(bio);

      const availableSpace = 250 - countedInput;

      const first250Words = getFirst250Words(value);

      const availableWordsToPaste = getFirstWords(
        first250Words,
        availableSpace
      );

      const availableWordsToPasteLength = countWords(availableWordsToPaste);

      const newstr = bio + availableWordsToPaste;
      setBioLength(countWords(newstr));
      setBio(newstr);
      console.log(countedInput, availableWordsToPasteLength, "available");
    }
  };

  const [emailError, setEmailError] = useState(false);
  const [abnError, setAbnError] = useState(false);
  const [weblinkError, setWeblinkError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "businessName") {
      setBusinessName(value);
    } else if (name === "businessEmail") {
      if (!validateEmail(value)) {
        setEmailError(true);
        setEmail(value);
      } else if (value?.length === 0 || value?.length > 30) {
        setEmailError(false);
      } else {
        setEmailError(false);
        setEmail(value);
      }
    }

    if (name === "phoneNumber") {
      if (value?.length < 16) {
        setPhoneNo(value);
      }
    }

    if (name === "abn") {
      const abnNumber = value.replace(/\s/g, "");
      const updatedABN = abnNumber.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1-$2-$3-$4"
      );
      if (!isValidABN(updatedABN)) {
        setAbnError(true);
      } else {
        setAbnError(false);
      }

      setAbn(abnNumber);
    }
    if (name === "weblink") {
      if (value?.length > 40) {
        return;
      }
      if (!value.includes(".com")) {
        setWeblinkError(true);
      } else if (value?.length === 0) {
        setWeblinkError(false);
      } else {
        setWeblinkError(false);
      }
      setWeblink(value?.trim());
    }
  };

  const submitAddBusiness = () => {
    // console.log(address, "event");
    // if (!businessName) {
    //   toastHandler("Business Name is required.", TOAST_TYPE_ERROR);
    //   return;
    // }
    // if (businessName?.length > 30) {
    //   toastHandler(
    //     "Max length should be less than 30 character.",
    //     TOAST_TYPE_ERROR
    //   );
    //   return;
    // }
    // if (!address) {
    //   toastHandler("Address is required.", TOAST_TYPE_ERROR);
    //   return;
    // }
    // if (address?.length > 100) {
    //   toastHandler(
    //     "Address length should be less than 100 character.",
    //     TOAST_TYPE_ERROR
    //   );
    //   return;
    // }
    // if (!bio) {
    //   toastHandler("Bio is required.", TOAST_TYPE_ERROR);
    //   return;
    // }
    // if (bio?.length > 500) {
    //   toastHandler(
    //     "Bio length should be less than 500 character",
    //     TOAST_TYPE_ERROR
    //   );
    //   return;
    // }
    // if (weblinkError) {
    //   toastHandler("Website link is invalid ", TOAST_TYPE_ERROR);
    //   return;
    // }
    // if (emailError) {
    //   toastHandler("Email is invalid ", TOAST_TYPE_ERROR);
    //   return;
    // }
    // if (abnError) {
    //   toastHandler("ABN is not valid ", TOAST_TYPE_ERROR);
    //   return;
    // }
    // if (!business_id) {
    //   navigate("/signup") ;
    //   return;
    // }

    const formData = new FormData();

    formData.append("logo", selectedImage);
    formData.append("business_id", business_id);
    formData.append("name", businessName);
    formData.append("email", email);
    formData.append("website", weblink);
    formData.append("abn", abn);
    formData.append("phone_number", phoneNo);

    const businessData = {
      business_id: business_id,
      name: businessName,
      email: email,
      website: weblink,
      abn: abn,
      phone_number: phoneNo,
      stripe_plan_id: "id_1",
      address,
      description: bio,
    };

    dispatch(setLoader(true));
    dispatch(addBusinessThunk(businessData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          props.toggleBusinessSide();
          toastHandler("Business added successfully ", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const handleAddressChange = (event) => {
    setAddress(event);
  };
  useEffect(() => {
    fetchBusiness();
  }, []);

  const onSelect = (place) => {
    console.log(place.formatted_address, "1212dd");
    setAddress(place.formatted_address);
  };

  const saveImage = (image) => {
    const file = DataURIToBlob(image);
    const formData = new FormData();

    formData.append("business_logo", file, croppedImage?.name);

    formData.append("uploaded_by", USER_TYPE);

    setBusinessLoader(true);
    dispatch(uploadBusinessLogoThunk(formData))
      .then((response) => {
        console.log(response.payload);
        setSelectedImage(image);
        setSelectedImage(response.payload.logo);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setBusinessLoader(false);
        fetchBusiness();
      });
  };
  return (
    <div className="show-business-side grid grid-cols-5">
      <div className="col-span-3">
        {selectedFile && showCropper ? (
          <ImageCropper
            setShowCroper={setShowCropper}
            image={selectedFile}
            handleCroppedImage={(image) => saveImage(image)}
            isCircular={true}
          />
        ) : (
          ""
        )}
      </div>
      <motion.div
        initial={{ x: 700 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="col-span-2   inner-right relative"
      >
        <div
          onClick={hideSide}
          className="text-white  p-2 absolute right-1 top-1 cursor-pointer"
        >
          <SideTimes />
        </div>

        <div className="add-business-info p-5 pt-10">
          <div className="title">Add Business</div>

          {/* <div className="my-2 business-logo">Upload Business Logo</div> */}

          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <div className="upload-camera p-1 cursor-pointer">
              <div className="inner-upload flex justify-center items-center flex-col">
                <div>{businessLoader ? <SmallLoader /> : <ImageIcon />}</div>
                <div className="upload-text mt-1">Click to upload</div>
              </div>
            </div>
          </label> */}

          <div className="flex justify-center items-center">
            {" "}
            <div className="profile-image-container mt-5 ">
              <div className={`flex justify-center items-center h-full w-full`}>
                {businessLoader ? (
                  <SmallLoader />
                ) : selectedImage ?? businessProfile?.logo ? (
                  <img
                    className="profile-image-edit"
                    src={selectedImage ? selectedImage : businessProfile?.logo}
                    alt=""
                    onClick={() => businessProfile?.logo && setIsZoomed(true)}
                  />
                ) : (
                  <div className="user-icon-dummy">
                    <DefaultUserIcon />
                  </div>
                )}
              </div>
              {isZoomed && (
                <ZoomImage
                  src={businessProfile?.logo}
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

          <div className=" add-ann-form  mt-5">
            <div>
              <label>Business Name</label>
            </div>
            <div>
              <input
                onChange={(e) => handleChange(e)}
                name="businessName"
                type="text"
                maxLength={40}
                className=" px-3 rounded-xl mt-2"
                placeholder="Business Name"
                value={businessName}
              />
            </div>

            <div className="grid grid-cols-2 mt-2 gap-5">
              <div>
                <div>
                  <div>
                    <label>Email</label>
                  </div>
                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="businessEmail"
                      type="email"
                      placeholder="Enter Email"
                      className="rounded-xl px-3"
                      value={email}
                    />
                  </div>
                  <div className="error-div mt-1">
                    {" "}
                    {emailError && <span> Invalid Email </span>}{" "}
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <label>ABN</label>
                  </div>
                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="abn"
                      type="text"
                      maxLength="60"
                      placeholder="ABN"
                      className="rounded-xl px-3"
                      value={abn}
                    />
                  </div>
                  <div className="error-div mt-1">
                    {" "}
                    {abnError && <span> Invalid ABN number</span>}{" "}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label>Phone Number</label>
                  </div>
                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="phoneNumber"
                      type="number"
                      max={14}
                      placeholder="Enter Phone No"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      className="rounded-xl px-3"
                      value={phoneNo}
                    />
                  </div>
                </div>

                <div>
                  <div className="mt-1">
                    <label>Website Link</label>
                  </div>
                  <div>
                    <input
                      onChange={(e) => handleChange(e)}
                      name="weblink"
                      type="url"
                      placeholder="enter website link"
                      className="rounded-xl px-3"
                      value={weblink?.trim()}
                    />
                  </div>
                  <div className="error-div mt-1">
                    {" "}
                    {weblinkError && (
                      <span>
                        {" "}
                        Invalid Website{" "}
                        <link
                          rel="shortcut icon"
                          href="favicon.ico"
                          type="image/x-icon"
                        />{" "}
                      </span>
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <PickAddress
                  onSelect={onSelect}
                  address={address}
                  setAddress={setAddress}
                />
              </div>
            </div>
            <div className="add-ann-form">
              <div>
                <label>Bio</label>
              </div>
              <div>
                <textarea
                  placeholder="Bio"
                  onChange={(e) => handleBio(e.target.value)}
                  onInput={(e) => handlePastBio(e)}
                  cols="30"
                  rows="10"
                  value={bio}
                  className="rounded-xl p-3 font-poppins"
                >
                  {" "}
                </textarea>
              </div>
              <div className="bio-length">{bioLength} / 250</div>
            </div>
          </div>

          <div className="flex justify-center  btn-wrap mt-20 max-lg:mt-24">
            <button
              onClick={submitAddBusiness}
              className="add-btn text-white px-16 py-2 rounded-md cursor-pointer"
            >
              {isLoading ? (
                <span>
                  {" "}
                  <SmallLoaderWhite />{" "}
                </span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBusinessSide;
