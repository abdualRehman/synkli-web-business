import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Ripples from "react-ripples"
import { toastHandler } from 'responseHanlder';
import { authEmailSendOtpThunk } from 'store/auth/slices';
import { handleUserPasswords } from 'store/global/globalReducer';
import { ERROR_TYPE_ERROR, USER_TYPE } from 'utills/globalVars';
import { LockIcon } from 'utills/svgs/LockIcon';
export const CHnagePasswordInputs = ({handleCondition}) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoader, setPasswordLoader] = useState(false)
    const dispatch = useDispatch()
     const {data} = useSelector((state) => state.login)
     console.log(data)
    const [passwordError, setPasswordError] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");
  
    const handlePasswordValidate = (e) => {
      const { value } = e.target;
      setNewPassword(value);
      if (value.length < 8) {
        setValidationMessage("Password must be greater than 8 characters.");
      } else {
        setValidationMessage("");
      }
    };
  
    const handlePassword = (e) => {
      const { value } = e.target;
      setConfirmPassword(value);
      if (value !== newPassword) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    };


    const handleSetPassword = () => {

        const formData = {
            password : currentPassword,
            newPassword : confirmPassword
        }

        console.log(currentPassword, newPassword, confirmPassword)

        if(!currentPassword || !newPassword || !confirmPassword) {
            toastHandler("Please fill in required fields", ERROR_TYPE_ERROR);
            return
        }

        const payload = {
            type : 7,
            user_type : USER_TYPE,
            user_id :data?.user_id
        }
          setPasswordLoader(true)
        dispatch(handleUserPasswords(formData))
         dispatch(authEmailSendOtpThunk(payload)).then((response) => {
            console.log(response.payload)
            if(response.payload) {
                handleCondition(2)
            }
         }).catch((error) => {
            console.log(error)
         }).finally(() => {setPasswordLoader(false)})
    
    }

  return (
    <div>
        
        <div className="change-password-form mt-5">
                <div className="inner-form">
                  <div>
                    <label>Current Password</label>
                  </div>
                  <div className="pass-input-wrapper mt-1">
                    <div className="absolute-lock">
                      <LockIcon />
                    </div>
                    <input
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="inner-form mt-3">
                  <div>
                    <label>New Password</label>
                  </div>
                  <div className="pass-input-wrapper mt-1">
                    <div className="absolute-lock">
                      <LockIcon />
                    </div>
                    <input
                      onChange={handlePasswordValidate}
                      type="password"
                      placeholder="Password"
                    />
                    {newPassword !== "" ? (
                      <div className="error-div mt-1">
                        {validationMessage && (
                          <span> {validationMessage} </span>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="inner-form mt-3">
                  <div>
                    <label>Confirm Password</label>
                  </div>
                  <div className="pass-input-wrapper mt-1">
                    <div className="absolute-lock">
                      <LockIcon />
                    </div>
                    <input
                      onChange={handlePassword}
                      type="password"
                      placeholder="Password"
                    />
                    {confirmPassword !== "" ? (
                      <div className="error-div mt-1">
                        {passwordError && <span> Password Mismatch </span>}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="bottom-pass flex justify-center items-center mt-10">
            <Ripples during={2000} color="#333333">
              <button 
               onClick={handleSetPassword}
              className="add-btn text-white px-20 py-2 rounded-md">
                save
              </button>
            </Ripples>
          </div>
    </div>
  )
}
