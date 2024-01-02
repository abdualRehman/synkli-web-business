import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css-steps/signup-css/stepOne.css";
import { validateEmail, validateTextField } from "../../utills/FormValidation";
import Ripples from "react-ripples";
import { StepWizardFirst } from "../../utills/svgs/StepWizardFirst";
import { Loader } from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { setLoader } from "../../store/global/globalReducer";
import { toastHandler } from "responseHanlder";
import { PLACES_API_KEY } from "utills/globalVars";
import { PickAddress } from "global-components/PickAddress";
import isValidABN from "is-valid-abn";
import { io } from "socket.io-client";
import {
  connectSocket,
  disconnectSocket,
  startHeartbeatInterval,
  stopHeartbeatInterval,
} from "utills/socketEvents";

const StepOne = (props) => {
  const signupUser = localStorage.getItem("signupUser");
  const userP = signupUser ? JSON.parse(signupUser) : {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [abnError, setAbnError] = useState(false);
  const [address, setAddress] = useState(userP?.address);
  const addressRef = useRef(null);
  const isLoading = useSelector((state) => state.global.isLoading);

  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [socketId, setSocketId] = useState("");
  const { intervalId } = useSelector((state) => state.global);
  const [breakConnection, setBreakConnection] = useState(false);

  //https://api.synkli.dev/?email=radoh99280%40gearstag.com&user_type=customer&category=pre_auth&event_ids=access_token=

  const [user, setUser] = useState({
    firstName: userP?.first_name ?? "",
    lastName: userP?.last_name ?? "",
    email: userP?.email ?? "",
    businessName: userP?.name ?? "",
    abnNumber: userP?.abn ?? "",
  });

  // const socket = io("https://api.synkli.dev", {
  //   query: {
  //     access_token: "",
  //     email: user?.email,
  //     user_type: "employee",
  //     category: "pre_auth",
  //     event_ids: "",
  //   },
  // });

  const [businessNameError, setBusinessNameError] = useState(false);

  //Handle Changes to Get Values
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      if (/\d/.test(value)) {
        setNameError(true);
        return;
      } else {
        if (!validateTextField(value)) {
          setNameError(true);
        } else {
          setNameError(false);
        }
        setUser({
          ...user,
          [name]: name === "abnNumber" ? value.replace(/\s/g, "") : value,
        });
      }
    }

    if (name === "lastName") {
      if (/\d/.test(value)) {
        setLastNameError(true);
        return;
      }
      if (!validateTextField(value)) {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
      setUser({
        ...user,
        [name]: name === "abnNumber" ? value.replace(/\s/g, "") : value,
      });
    }

    if (name === "businessName") {
      // if (!validateTextField(value)) {
      //   setBusinessNameError(true);
      // } else {
      //   setBusinessNameError(false);
      // }
      setUser({
        ...user,
        [name]: name === "abnNumber" ? value.replace(/\s/g, "") : value,
      });
    }

    if (name === "email") {
      if (value.trim().length === 0) {
        setEmailError("");
      } else if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
      setUser({
        ...user,
        [name]: name === "abnNumber" ? value.replace(/\s/g, "") : value,
      });
    }

    if (name === "abnNumber") {
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
      setUser({
        ...user,
        [name]: name === "abnNumber" ? value.replace(/\s/g, "") : value,
      });
    }
  };

  const userData = {
    first_name: user.firstName,
    last_name: user.lastName,
    abn: user.abnNumber,
    email: user.email,
    name: user.businessName,
    address: address,
    user_type: "employee",
    socket_id: socketId,
  };

  const signupData = {
    email: user.email,
    type: 1,
    user_type: "employee",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBreakConnection(true);

    if (
      nameError ||
      lastNameError ||
      businessNameError ||
      emailError ||
      abnError
    ) {
      return;
    }

    if (!address) {
      toastHandler("Please enter a valid address. ", "error");
      return;
    }
    if (abnError) {
      toastHandler("Invalid ABN number ", "error");
      return;
    }

    const isAnyValueEmpty = Object.values(user).some((value) => value === "");
    if (isAnyValueEmpty) {
      toastHandler("Please fill in signup credentials. ", "error");
      return;
    }

    dispatch(setLoader(true));

    setTimeout(() => {
      // const newSocket = connectSocket("pre_auth", "", "employee", user?.email);
      const newSocket = io("https://api.synkli.dev", {
        query: {
          access_token: "",
          email: user?.email,
          user_type: "employee",
          category: "pre_auth",
          event_ids: "",
        },
      });
      newSocket?.on("connect", () => {
        newSocket?.emit("heartbeat", "");
        localStorage.setItem("socket_id", newSocket?.id);
        startHeartbeatInterval(dispatch, newSocket);
      });

      newSocket.on("pre_auth", (data) => {
        const parsetData = JSON.parse(data);

        if (parsetData.action === "info") {
          dispatch(setLoader(false));

          dispatch(setLoader(false));
          toastHandler(parsetData.data, "success");
          localStorage.setItem("signupUser", JSON.stringify(userData));
          navigate(`/signup/otp/verification`);
        } else {
          dispatch(setLoader(false));

          setBreakConnection(true);
          dispatch(setLoader(false));
          disconnectSocket(newSocket);
          toastHandler(parsetData?.data[0], "error");
        }
      });

      newSocket.on("disconnect", () => {
        console.log("disconnected", "123");
      });
    }, 5000);
  };

  const data = useSelector((state) => state.login.data);
  const handleSelectAddress = (place) => {
    console.log("Selected Place:", place);
    console.log("Place details:", place.properties);
    setAddress(place?.label);
  };

  const apiKey = PLACES_API_KEY;
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onSelect = (place) => {
    console.log(place.formatted_address, "1212dd");
    setAddress(place.formatted_address);
  };

  useEffect(() => {
    if (intervalId) {
      stopHeartbeatInterval(dispatch, intervalId);
      setBreakConnection(false);
    }
  }, [breakConnection]);

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="flex justify-center items-center signup-container">
        <motion.div
          initial={{ scale: 0.9, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
          className="sign-up relative"
        >
          <div className="text-center pt-3">
            <h1 className=" title ">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="add-ann-form">
              <div className="grid md:grid-cols-2 gap-5 p-10">
                <div>
                  <h1 className="body-title">Personal</h1>
                  <div className="mt-3">
                    <label>First Name</label> <br />
                    <input
                      type="text"
                      maxLength="30"
                      className={`px-3 mt-2 ${
                        nameError && user.firstName ? "add-error-border" : ""
                      }`}
                      placeholder="Enter your first name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      required
                    />
                    <div className="error-div mt-1">
                      {nameError && user.firstName ? (
                        <span> invalid first name</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <label>Last Name</label> <br />
                    <input
                      type="text"
                      maxlength="50"
                      className={`px-3 mt-2 ${
                        lastNameError && user.lastName ? "add-error-border" : ""
                      }`}
                      placeholder="Enter your last name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      required
                    />
                    <div className="error-div mt-1">
                      {lastNameError && user.lastName ? (
                        <span> Invalid last name</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label>Email</label> <br />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      className={`px-3 mt-2 ${
                        emailError && user.email ? "add-error-border" : ""
                      }`}
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="error-div mt-1">
                      {emailError && <span> {emailError} </span>}
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="body-title">Business</h1>

                  <div className="mt-3">
                    <label>Business Name</label> <br />
                    <input
                      type="text"
                      className={`px-3 mt-2 ${
                        businessNameError && user.businessName
                          ? "add-error-border"
                          : ""
                      }`}
                      maxLength="30"
                      placeholder="Enter your business name"
                      name="businessName"
                      value={user.businessName}
                      onChange={handleChange}
                      required
                    />
                    <div className="error-div mt-1">
                      {businessNameError && user.businessName ? (
                        <span> Invalid Business name </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <PickAddress
                      address={address}
                      setAddress={setAddress}
                      onSelect={onSelect}
                    />
                    {/* <GooglePlacesAutocomplete
                      // value={address}
                      selectProps={{
                        defaultInputValue: address,
                        onChange: handleSelectAddress,
                        styles: {
                          input: (provided) => ({
                            ...provided,
                            color: "blue",
                            overflow: "hidden",
                            fontFamily: "poppins",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                          }),
                          option: (provided) => ({
                            ...provided,
                            color: "blue",
                            overflow: "hidden",
                            fontFamily: "poppins",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                          }),
                          singleValue: (provided) => ({
                            ...provided,
                            color: "blue",
                            overflow: "hidden",
                            fontFamily: "poppins",
                            fontWeight: "400",
                            fontSize: "0.8rem",
                          }),
                        },
                      }}
                      apiKey={PLACES_API_KEY}
                    /> */}
                    {/* <Autocomplete
                      onChange={(e) => setAddress(e.target.value)}
                      apiKey={PLACES_API_KEY}
                      value={address}
                      className="px-3 mt-2"
                      placeholder="Enter your business address"
                      onPlaceSelected={(place) =>
                        setAddress(place.formatted_address)
                      }
                    /> */}
                  </div>

                  <div className="mt-3">
                    <label>ABN Number</label> <br />
                    <input
                      type="number"
                      className={`px-3 mt-2 ${
                        abnError && user.abnNumber ? "add-error-border" : ""
                      }`}
                      placeholder="Enter your ABN number"
                      name="abnNumber"
                      maxlength="10"
                      value={user.abnNumber}
                      onChange={handleChange}
                      required
                    />
                    <div className="error-div mt-1">
                      {abnError && user.abnNumber ? (
                        <span> Invalid ABN Number </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="signup-one-lower text-center">
                <Ripples during={2000} color="#979797">
                  <button
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="ann-btn px-16 rounded-md py-2"
                  >
                    Next
                  </button>
                </Ripples>

                <p className="mt-3 ">
                  Already have an account ?
                  <span
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-blue-950 cursor-pointer pl-1"
                  >
                    Sign In
                  </span>
                </p>
                <span className="svg-wrapper">
                  <StepWizardFirst />
                </span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      <div></div>
    </div>
  );
};

export default StepOne;
