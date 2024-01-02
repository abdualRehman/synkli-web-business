import { motion } from "framer-motion";
import "../../css-steps/signup-css/signupSuccess.css";
import { useNavigate } from "react-router-dom";
import Ripples from "react-ripples";
import { SuccessTick } from "../../utills/svgs/SuccessTick";
const SignupSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center signup-success-container">
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="signup-success-page"
      >
        <div className="flex justify-center items-center mt-5">
          <motion.div
            initial={{ rotate: 100, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.5 }}
            className="svg-wrapper scale-50 "
          >
            <SuccessTick />
          </motion.div>
        </div>

        <div className="mt-5">
          <h1 className="text-center s-title ">Registration Successful</h1>
        </div>
        <div className="px-5">
          <p className="text-center s-text">
            Thanks, You have successfully signed up
          </p>
        </div>

        <div className="s-btn-wrapper mt-3 mb-16">
          <Ripples during={2000} color="#ffec3b">
            <button
              onClick={() => navigate("/")}
              className="ann-btn px-12 py-2 rounded-md"
            >
              Go To Login
            </button>
          </Ripples>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupSuccess;
