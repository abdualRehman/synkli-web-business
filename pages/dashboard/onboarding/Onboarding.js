import { useDispatch, useSelector } from "react-redux";
import OnboardingPage from "../../../components/dashboard-components/onboarding-components/OnboardingPage";
import { useEffect } from "react";
import {
  getBranchLocationsThunk,
  getBusinessprofileThunk,
} from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";
import { useGetAllServices } from "Hooks/useGetAllServices";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: loginData } = useSelector((state) => state.login);
  const { getServices } = useGetAllServices();
  const business_id = localStorage.getItem("business_id");
  const { data } = useSelector((state) => state.login);
  const email_2fa = JSON.parse(localStorage.getItem("email_2fa"));
  const getBranches = () => {
    dispatch(getBranchLocationsThunk({ user_id: data?.user_id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  useEffect(() => {
    dispatch(getBusinessprofileThunk())
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getServices();
        getBranches();
      });
  }, []);

  console.log(loginData, "loiginddd");
  return (
    <div>
      {!email_2fa ? (
        <div className="w-full h-72 flex justify-center flex-col gap-5 items-center font-poppins">
          <div>Please complete 2 factor authentication </div>
          <div>
            {" "}
            <button
              onClick={() => navigate("/dashboard")}
              className="ann-btn px-5 rounded-md"
            >
              Complete
            </button>{" "}
          </div>
        </div>
      ) : !loginData?.is_employee ? (
        <OnboardingPage />
      ) : (
        <div className="w-full h-72 flex justify-center items-center font-poppins">
          You dont have permission to access this data
        </div>
      )}
    </div>
  );
};

export default Onboarding;
