import { useState, useRef, useEffect } from "react";
import AppSidebar from "../../appSidebarComp/AppSidebar";
import "./css/appuserProfile.css";
import ProfileJumbo from "./profile-jumbo/ProfileJumbo";
import ProfileModel from "./profile-jumbo/ProfileModel";
import ProfileCards from "./profile-cards/ProfileCards";
import { useParams } from "react-router-dom";
import { viewBusinessCustomerInfoThunk } from "store/client";
import { setLoader } from "store/global/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_TYPE_ERROR } from "utills/globalVars";
import { toastHandler } from "responseHanlder";
import { customerActivityThunk } from "store/form";

const AppUserProfilePage = ({
  toggleForms,
  toggleRentalDeduction,
  toggleAbnDeduction,
  toggleTfnDeduction,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [businessCustomer, setBusinessCustomerInfo] = useState(null);
  const { data: loginData } = useSelector((state) => state.login);

  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchCustomer = () => {
    dispatch(setLoader(true));
    const payload = {
      business_client_id: id,
    };
    dispatch(viewBusinessCustomerInfoThunk(payload))
      .then((response) => {
        console.log(response.payload, "customer");
        setBusinessCustomerInfo(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    fetchCustomer();

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, id]);

  function toggleModal() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Clients?.admin ||
      allPermissions?.Clients?.write
    ) {
      setShowModal(!showModal);
    } else {
      toastHandler(
        "You dont have permission to view this page",
        ERROR_TYPE_ERROR
      );
    }
  }
  return (
    <div className="app-user-profile-page relative">
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <ProfileJumbo toggleModal={toggleModal} user={businessCustomer} />
        {showModal ? (
          <div ref={modalRef}>
            {" "}
            <ProfileModel
              fetchCustomer={fetchCustomer}
              user={businessCustomer}
              setShowModal={setShowModal}
            />
          </div>
        ) : (
          ""
        )}

        <div>
          <ProfileCards
            user={businessCustomer}
            toggleForms={toggleForms}
            toggleRentalDeduction={toggleRentalDeduction}
            toggleAbnDeduction={toggleAbnDeduction}
            toggleTfnDeduction={toggleTfnDeduction}
          />
        </div>
      </div>
    </div>
  );
};

export default AppUserProfilePage;
