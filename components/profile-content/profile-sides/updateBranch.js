import React from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'
import { PLACES_API_KEY } from 'utills/globalVars'
import { SideTimes } from 'utills/svgs/SideTimes'
import {motion} from "framer-motion"
export const updateBranch = () => {
    // updateBranchThunk

    
  return (
    <div className="add-branch-side grid grid-cols-6 add-p-side">
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
            // onClick={toggleBranchSide}
            className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
          >
            <SideTimes />
          </div>
        </div>

        <div className="service-info pt-10 p-5">
          <div className="title">Add Branch Location</div>

          <div className="branch-navigate mt-1">
            Profile <span className="bn-black"> &gt; Branch Location</span>
          </div>

          <div className="service-form mt-3">
            <div>
              <div>
                <label>Branch Title</label>
              </div>
              <div>
                <input
                //   onChange={handleInputChange}
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
                //   onChange={handleInputChange}
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
                //   onChange={handleInputChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="px-3 rounded-xl mt-1"
                />
{/* 
                {formData.email !== "" ? (
                  <div className="error-div mt-1">
                    {emailError && <span> Invalid Email </span>}
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            </div>

            <div className="mt-2">
              <div>
                <label>Address</label>
              </div>
              <div>
                {/* <input
                  onChange={handleInputChange}
                  name="address"
                  type="text"
                    maxLength="60"
                  placeholder="Add Complete Adress"
                  className="px-3 rounded-xl mt-1"
                /> */}

                <ReactGoogleAutocomplete
                  apiKey={PLACES_API_KEY}
                //   onChange={(e) => setAddress(e.target.value)}
                  className="px-3 rounded-xl mt-1"
                  placeholder="Enter your business address"
                //   onPlaceSelected={(place) =>
                //     setAddress(place.formatted_address)
                //   }
                />
              </div>
            </div>
          </div>

          <div className="service-btn-wrapper flex justify-center items-center mt-20">
         
              <button
                // disabled={emailError}
                // onClick={handleSubmit}
                className="px-20 py-2 rounded-md text-white"
              >
                Add
              </button>
            
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  )
}
