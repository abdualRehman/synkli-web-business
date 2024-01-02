import { useNavigate } from "react-router-dom";
import "../../dashboard-css/auth-css/emailSuccess.css";
import { motion } from "framer-motion";
import { EnvelopeSuccess } from "../../../utills/svgs/EnvelopeSuccess";
import Ripples from "react-ripples";

const EmailSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: "tween", duration: 0.6 }}
      className="email-success-page"
    >
      <div className="email-success-outer">
        <div>
          <div className="envelope">
            <div className="envelope-wrapper">
              <EnvelopeSuccess />
            </div>
          </div>

          <div className="congrats">
            <h1 className="text-center">Congratulation!</h1>

            <p className="text-center">Your Email has been successfully</p>
            <p className="text-center">
              verified for Two Factor Authentication
            </p>
          </div>

          <div className="proceed-btn mt-5 mb-10">
            <center>
              <Ripples during={2000} color="#979797">
                <button
                  onClick={() => navigate("/two/factor/auth")}
                  className="px-12 py-2"
                >
                  proceed
                </button>
              </Ripples>
            </center>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailSuccessPage;
