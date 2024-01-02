import { useDispatch, useSelector } from "react-redux";
import "./css/addBranch.css";
import Ripples from "react-ripples";
import { useState } from "react";
import { useEffect } from "react";
import { setLoader } from "store/global/globalReducer";
import { getBranchLocationsThunk } from "store/auth/slices";
import { SmallLoader } from "components/common/SmallLoader";

import { EnvelopeIcon } from "utills/svgs/EnvelopeIcon";
import { LocationPin } from "utills/svgs/LocationPin";
import { Telephone } from "utills/svgs/Telephone";
import { ErrorIcon } from "utills/svgs/ErrorIcon";
import { Plus } from "utills/svgs/Plus";
const AddBranchLocation = ({ toggleBranchSide, isUpdated }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const [branchLocations, setBranchLocations] = useState(null);
  const data = useSelector((state) => state.login.data);

  useEffect(() => {
    dispatch(setLoader(true));

    setTimeout(() => {
      dispatch(getBranchLocationsThunk({ user_id: data?.user_id }))
        .then((response) => {
          if (response.payload) {
            setBranchLocations(response.payload);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    }, 500);
  }, [dispatch, isUpdated]);
  return (
    <div className="add-branch py-2">
      {isLoading ? (
        <div className="branch-location-loader">
          {" "}
          <SmallLoader />{" "}
        </div>
      ) : (
        <div>
          {" "}
          <div className="flex justify-end">
            <Ripples during={2000} color="#333333">
              <button
                onClick={toggleBranchSide}
                className="add-branch-btn px-5 p-2 rounded-md mr-2 text-white"
              >
                <Plus />
              </button>
            </Ripples>
          </div>
          {branchLocations && !branchLocations[0] ? (
            <div className="flex not-found-message justify-center h-80 items-center">
              No branch found
              <div> </div>
            </div>
          ) : (
            <div>
              {" "}
              {branchLocations?.map((location, index) => (
                <div key={index}>
                  <div
                    className={`service-body mt-2 p-2 mx-2  shadow-md rounded-md ${
                      index > 0 && "mt-5"
                    }`}
                  >
                    <div className="card-one">
                      <div className="title">{location.title}</div>
                      <div className="card-body mt-5">
                        <div>
                          <div className="flex gap-2">
                            <div className="flex justify-center items-center opacity-80">
                              <EnvelopeIcon />
                            </div>
                            <div>
                              <label>Email</label>
                            </div>
                          </div>
                          <span className="sub-head ml-7">
                            {location.email}
                          </span>
                        </div>

                        <div className="mt-2">
                          <div className="flex gap-2">
                            <div className="flex justify-center items-center">
                              <LocationPin />
                            </div>
                            <div>
                              <label>Address</label>
                            </div>
                          </div>
                          <span className="sub-head ml-7">
                            {location.address}
                          </span>
                        </div>

                        <div className="mt-2">
                          <div className="flex gap-2">
                            <div className="flex justify-center items-center">
                              <Telephone />
                            </div>
                            <div>
                              <label>Call us</label>
                            </div>
                          </div>
                          <span className="sub-head ml-7">
                            {location.phone_number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddBranchLocation;
