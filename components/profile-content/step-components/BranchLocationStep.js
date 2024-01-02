import { generateId } from "utills/uid";
import _ from "lodash";
import Cookies from "js-cookie";
import { DimmedDeleteIcon } from "../../../utills/svgs/DimmedDeleteIcon";
import { DimmedEditIcon } from "../../../utills/svgs/DimmedEditIcon";
import { EnvelopeIcon } from "../../../utills/svgs/EnvelopeIcon";
import { LocationPin } from "../../../utills/svgs/LocationPin";
import { Telephone } from "../../../utills/svgs/Telephone";
import { ThreeDotIcon } from "../../../utills/svgs/ThreeDotIcon";
import "./css/businessSteps.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BUSINESS_ID,
  PERMISSIONS_MESSAGE,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
} from "utills/globalVars";
import { useDispatch } from "react-redux";
import {
  editBranch,
  setLoader,
  setSideLoader,
} from "store/global/globalReducer";
import { deleteBranchThunk, getBranchLocationsThunk } from "store/auth/slices";

import { useEffect } from "react";
import { toastHandler } from "responseHanlder";
import ConfirmationModal from "utills/confirmationModal";
const BranchLocationStep = ({
  toggleBranchLocation,
  branchesUpdated,
  toggleEditBranch,
}) => {
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [delUpdate, setDelUpdate] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getBranchLocations);

  // const [data, setData] = useState(null);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [locationModal, setLocationModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  function toggleLocationModal(index) {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setModalIndex(index);
      setLocationModal(!locationModal);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, TOAST_TYPE_ERROR);
    }
  }

  const handleDelete = () => {
    setIsConfirmationOpen(false);
    const delBranchData = {
      branch_id: deleteId,
      business_id,
    };

    setLocationModal(false);

    dispatch(setSideLoader(true));
    dispatch(deleteBranchThunk(delBranchData))
      .then((response) => {
        if (response.payload) {
          setDelUpdate(!delUpdate);
          toastHandler("Branch deleted", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteBranch = (branch_id) => {
    setIsConfirmationOpen(true);
    setDeleteId(branch_id);
  };

  useEffect(() => {
    dispatch(getBranchLocationsThunk({ user_id: loginData?.user_id }))
      .then((response) => {
        if (response.payload) {
          // setData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  }, [dispatch, branchesUpdated, delUpdate]);

  useEffect(() => {
    // setData(_.cloneDeep(branchData));
  }, []);

  const handleBranchUpdate = (branch) => {
    dispatch(editBranch(branch));
    toggleEditBranch();
  };

  const handleAddlocation = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      toggleBranchLocation();
    } else {
      toastHandler(PERMISSIONS_MESSAGE, TOAST_TYPE_ERROR);
    }
  };
  return (
    <div className="md:px-10 px-5 mt-3">
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      {data && data?.length < 1 ? (
        <div className=" branch-locations">
          {" "}
          <div className="flex top-btn-service justify-end my-3">
            <button
              onClick={handleAddlocation}
              className="text-white rounded-xl px-3 py-2"
            >
              Add Branch Location
            </button>
          </div>
          <div className="location-sub-title flex justify-center items-center">
            No branch added yet click on top right button to add one
          </div>
        </div>
      ) : (
        <div className="branch-locations shadow md:grid grid-cols-2">
          <div className="locations-left px-5">
            <div className="flex top-btn-service justify-end my-3">
              <button
                onClick={handleAddlocation}
                className="text-white rounded-xl px-3 py-2"
              >
                Add Branch Location
              </button>
            </div>

            {data &&
              data?.map((location, index) => (
                <div>
                  <div
                    className="location-grid shadow my-2 rounded-xl relative "
                    key={generateId()}
                  >
                    <div
                      onClick={() => toggleLocationModal(index)}
                      className="absolute right-3 top-2 cursor-pointer"
                    >
                      <ThreeDotIcon />
                    </div>

                    {locationModal && modalIndex === index ? (
                      <div className="absolute service-modal shadow right-5 top-5 ">
                        <div
                          onClick={() => handleBranchUpdate(location)}
                          className="flex gap-2 px-2 py-2 modal-div "
                        >
                          <div className="service-icon">
                            <DimmedEditIcon />
                          </div>
                          <div>Edit</div>
                        </div>
                        <div className="flex gap-2 px-2 py-2 modal-div">
                          <div className="service-icon ">
                            <DimmedDeleteIcon />
                          </div>
                          <div
                            onClick={() =>
                              deleteBranch(location?.business_branch_id)
                            }
                            className="cursor-pointer"
                          >
                            Delete
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="title border-r p-2 ">
                      {" "}
                      {location?.title}{" "}
                    </div>
                    <div className="p-5">
                      <div className="flex gap-2  ">
                        <div className="mt-1">
                          <EnvelopeIcon />
                        </div>
                        <div>
                          <div className="location-sub-title">Email</div>
                          <div className="location-info">{location?.email}</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4  ">
                        <div className="mt-1">
                          <LocationPin />
                        </div>
                        <div>
                          <div className="location-sub-title">Address</div>
                          <div className="location-info">
                            {location?.address}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4  ">
                        <div className="mt-1">
                          <Telephone />
                        </div>
                        <div>
                          <div className="location-sub-title">Call us</div>
                          <div className="location-info">
                            {location?.phone_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default BranchLocationStep;
