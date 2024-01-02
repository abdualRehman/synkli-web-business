import "./css/loginSuccessfull.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LaptopUser } from "../../utills/svgs/LaptopUser";
import { useDispatch, useSelector } from "react-redux";
import { viewOnBoardingDetailsThunk } from "store/auth/slices";
import { setSideLoader } from "store/global/globalReducer";
const LoginSuccessfullPage = () => {
  const navigate = useNavigate();
  const { data: loginData } = useSelector((state) => state.login);
  const token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const onBoardingCheck = () => {
    console.log(token, "tooken");
    console.log('loginDataAA', loginData);
    
    if (loginData?.is_employee) {
      if (loginData.is_password_change_required) {
        navigate(`/update-ot-password/${loginData.user_id}`);
      } else {
        navigate("/main/dashboard");
      }

      return;
    }
    dispatch(viewOnBoardingDetailsThunk())
      .then((response) => {
        if (response.payload) {
          if (
            response.payload?.user &&
            response.payload.business &&
            response.payload.branch &&
            response.payload.service
          ) {
            navigate("/settings");
            return;
          }
          if (!loginData?.is_employee) {
            navigate("/onboarding");
          }

        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="login-successfull flex flex-col justify-center items-center gap-5"
        >
          <div className="mt-10">
            <LaptopUser />
          </div>
          <div className="successfull-text">Login Successful!</div>
          <div className="mb-10">
            <button
              onClick={() => onBoardingCheck()}
              className="px-12 ann-btn flex justify-center items-center rounded-md"
            >
              Proceed
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSuccessfullPage;
