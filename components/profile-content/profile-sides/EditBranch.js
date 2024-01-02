import React, { useState } from 'react'
import {motion} from "framer-motion"
import { SideTimes } from 'utills/svgs/SideTimes'
import { PLACES_API_KEY } from 'utills/globalVars'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail } from 'utills/FormValidation'

import { updateBranchThunk } from 'store/auth/slices'
import { useGetAllBranches } from 'Hooks/useGetAllBranches'


export const EditBranch = ({toggleEditBranch}) => {
    const{branch} = useSelector((state) => state.global)
    const dispatch = useDispatch()
    const [title, setTitle] = useState(branch?.title)
    const [phone_number, setPhoneNo] = useState(branch?.phone_number)
    const [email, setEmail] = useState(branch?.email)
    const [address, setAddress] = useState(branch?.address)
    const [emailError, setEmailError] =useState(false)
    const {getBranches} = useGetAllBranches()

    const handleEmail = (e) => {
        const value = e.target.value
       if(!validateEmail(value)) {
           setEmailError(true)
       }else {
        setEmailError(false)
    
       }
       setEmail(value)
    }

    const handleSubmit = (e) => {
     e.preventDefault()
     const payload = {
      title,
      phone_number,
      email,
      address
     }
     dispatch(updateBranchThunk(payload)).then((response) => {
      console.log(response.payload, "ressssssss")
      if(response.payload) {
        getBranches()
        toggleEditBranch()
      }
     }).catch((error) => {
      console.log(error)
     })

    }
  return (
    <div>    <div className="add-branch-side grid grid-cols-6 add-p-side">
    <div className="md:col-span-4 hidden md:block left-side"></div>
    <div className="col-span-6 md:col-span-2 right-side">
      <motion.div
        initial={{ x: 700 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="inner-right relative"
      >
        <div>
          <div
            onClick={toggleEditBranch}
            className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
          >
            <SideTimes />
          </div>
        </div>

        <div className="service-info pt-10 p-5">
          <div className="title">Update Branch Location</div>

          <div className="branch-navigate mt-1">
            Profile <span className="bn-black"> &gt; Update Branch Location</span>
          </div>

      <form onSubmit={handleSubmit}>          <div className="add-ann-form mt-3">
            <div>
              <div>
                <label>Branch Title</label>
              </div>
              <div>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  name="branchTitle"
                  type="text"
                  maxLength="60"
                  placeholder="Branch Title"
                  className="px-3 rounded-xl mt-1"
                />
              </div>
            </div>

            <div className="mt-2">
              <div>
                <label>Phone Number</label>
              </div>
              <div>
                <input
                  maxLength="11"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  value={phone_number}
                  name="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                  className="px-3 rounded-xl mt-1"
                
                />
              </div>
            </div>

            <div className="mt-2">
              <div>
                <label>Email</label>
              </div>
              <div>
                <input
                  onChange={handleEmail}
                  value={email}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="px-3 rounded-xl mt-1"
                />

                {email !== "" ? (
                  <div className="error-div mt-1">
                    {emailError && <span> Invalid Email </span>}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="mt-2">
              <div>
                <label>Address</label>
              </div>
              <div>
                <ReactGoogleAutocomplete
                  apiKey={PLACES_API_KEY}
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={address}
                  className="px-3 rounded-xl mt-1"
                  placeholder="Enter your business address"
                  onPlaceSelected={(place) =>
                    setAddress(place.formatted_address)
                  }
                />
              </div>
            </div>
          </div>

          <div className="service-btn-wrapper flex justify-center items-center mt-20">
         
              <button
                // disabled={emailError}
                // onClick={handleSubmit}
                type='submit'
                className="px-20 py-2 rounded-md text-white"
              >
                Update
              </button>
            
          </div></form>
        </div>
      </motion.div>
    </div>
  </div></div>
  )
}
