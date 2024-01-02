import { motion } from "framer-motion";
import "../../css-steps/login-css/resetSuccess.css";
import { useNavigate } from "react-router-dom";
import Ripples from "react-ripples";
import { PasswordLock } from "../../utills/svgs/PasswordLock";
const ResetSuccess = (props) => {
  const navigate = useNavigate();
  const goBackToLogin = () => {
    navigate("/signup");
  };
  return (
    <div className="reset-success min-h-screen">
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="set-success shadow"
      >
        <div className="flex justify-center items-center mt-10">
          <motion.div
            initial={{ opacity: 0, rotate: 100 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.6 }}
            className="svg-wrapper scale-75 "
          >
            <PasswordLock />
          </motion.div>
        </div>

        <div>
          <h1 className="text-center s-title">Congratulations</h1>
        </div>
        <div className="px-5">
          <p className="text-center s-text">
            Thanks, You have successfully signed up
          </p>
        </div>

        <div className="s-btn-wrapper my-3">
          <Ripples duration={200} color="#979797">
            <button
              onClick={goBackToLogin}
              className="s-btn px-16 py-2 rounded-md"
            >
              Ok
            </button>
          </Ripples>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetSuccess;
