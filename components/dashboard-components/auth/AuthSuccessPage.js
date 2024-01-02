import { useNavigate } from "react-router-dom";
import "../../dashboard-css/auth-css/authSuccess.css";
import { motion } from "framer-motion";
import { MobileIconStarIcon } from "../../../utills/svgs/MobileIconStarIcon";
import Ripples from "react-ripples";
const AuthSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "tween", duration: 0.6 }}
      className="email-success-page grid grid-cols-3"
    >
      <div></div>
      <div className="email-success-outer">
        <div className="email-success-inner">
          <div className="envelope">
            <div className="envelope-wrapper">
              <MobileIconStarIcon />
            </div>
          </div>

          <div className="congrats">
            <h1 className="text-center">Congratulation!</h1>

            <p className="text-center">Your two-factor authentication is on</p>
          </div>

          <div className="px-12 py-5 success-msg">
            We’ll now ask you for a login code whenever you log in on a device
            that we don’t recognize
          </div>

          <div className="text-center success-msg">
            See your list of{" "}
            <span
              onClick={() => navigate("/backup/codes")}
              className="text-purple-900 cursor-pointer"
            >
              {" "}
              backup codes
            </span>
          </div>
          <div className="proceed-btn mt-5">
            <center>
              <Ripples during={2000} color="#979797">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-12 py-2"
                >
                  proceed
                </button>
              </Ripples>
            </center>
          </div>
        </div>
      </div>
      <div></div>
    </motion.div>
  );
};

export default AuthSuccessPage;
