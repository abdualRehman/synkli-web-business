import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toastHandler } from 'responseHanlder';
import { ERROR_TYPE_SUCCESS } from 'utills/globalVars';
import Ripples from "react-ripples"
import { updatePasswordThunk } from 'store/auth/slices';
export const ChangePasswordOtp = () => {
    const navigiate = useNavigate();
    const {userPasswords} = useSelector((state) => state.global)

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.global.isLoading)

  const showForgottenPass = () => {
    navigiate(`/forgot/password`);
  };
  const [timeRemaining, setTimeRemaining] = useState(67);
  const [timerEnded, setTimerEnded] = useState(false);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState([null, null, null, null, null, null]);

  const handleKeyUp = (event, index) => {
    const input = inputRefs[index].current;
  let value = input.value;

  if (value.length > 1) {
    value = value.charAt(0); // Keep only the first character
    input.value = value; // Update the input's value
  }

  if (value.length === 1 && index < inputRefs.length - 1) {
    inputRefs[index + 1].current.focus();
  }

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (event.keyCode === 8 && value.length === 0 && index > 0) {
    inputRefs[index - 1].current.focus();
  }
  };

  useEffect(() => {
    timeExecution();
  }, []);

  const handleSubmit = async (e) => {
    
    const OPT = parseInt(otp.join(""), 10);
    if (!OPT) {
        toastHandler("Please fill in required fields", ERROR_TYPE_SUCCESS);
      return;
    }
    const payload = {...userPasswords, otp : OPT}
    console.log(payload)
     e.preventDefault()
    
     dispatch(updatePasswordThunk(payload)).then((response) => {
        console.log(response.payload)
        if(response.payload) {
          toastHandler("Password updated",  ERROR_TYPE_SUCCESS)
        }
     }).catch((error) => {
        console.log(error)
     }).finally(() => {
        console.log("finally")
     })
    //  dispatch(setLoader(true))
    //  await dispatch(verifyForgetPassThunk({email, otp:OPT, user_type : "employee"})).then((response) => {
    //   dispatch(setLoader(false))
    //   console.log(response.payload)
    //   if(response.payload) {
    //     navigiate(`/login/security/questions/${email}`)
    //   }
    //  }).catch((error) => {
    //   dispatch(setLoader(false))
    //     console.log(error)
    //  })
   
    //  dispatch(setLoader(false))
  };

  const timeExecution = () => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          setTimerEnded(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };

//   const sendOTPEmail = async (e) => {
//     e.preventDefault();
//     dispatch(setLoader(true))
//     await dispatch(forgotPasswordThunk({email, user_type : "employee"})).then((response) => {
//       dispatch(setLoader(false))
//       console.log(response.payload)
    
//      }).catch((error) => {
//       dispatch(setLoader(false))
//         console.log(error)
//      })
//      dispatch(setLoader(false))
//   };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
  
      <div>
      
        <div

        >
          {/* <div className="title pt-3">
            <h1>OTP verification</h1>
          </div> */}

          <div className=" ">
            <div className="otp-body ">
              <p className="p-1">
                A 6-digit code is sent to your email. Kindly enter that code
                here to continue further. Thanks
              </p>
            </div>

            <div className="otp-inputs ">
              <div className="flex gap-3 items-center  ">
                <div>
                  <input
                    ref={inputRefs[0]}
                    onKeyUp={(event) => handleKeyUp(event, 0)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[1]}
                    onKeyUp={(event) => handleKeyUp(event, 1)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[2]}
                    onKeyUp={(event) => handleKeyUp(event, 2)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[3]}
                    onKeyUp={(event) => handleKeyUp(event, 3)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[4]}
                    onKeyUp={(event) => handleKeyUp(event, 4)}
                    maxLength="1"
                    type="number"
                  />
                </div>{" "}
                <div>
                  <input
                    ref={inputRefs[5]}
                    onKeyUp={(event) => handleKeyUp(event, 5)}
                    maxLength="1"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="resend-confirmation mt-5">
              <p>
                {timerEnded ? (
                  <span
                    className="text-blue-600 cursor-pointer"
                    // onClick={sendOTPEmail}
                  >
                    Resend
                  </span>
                ) : (
                  !timerEnded &&
                  `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                )}
              </p>
            </div>

            <div className="bottom-pass flex justify-center items-center mt-10">
            <Ripples during={2000} color="#333333">
              <button 
               onClick={handleSubmit}
              className="add-btn text-white px-20 py-2 rounded-md">
                save
              </button>
            </Ripples>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
