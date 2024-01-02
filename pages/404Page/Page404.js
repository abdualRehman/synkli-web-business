import React from "react";
import "./css/page404.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-404-header absolute top-5 left-5">SYNKLI</div>
      <div className="page-404">
        <div>
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            }}
            className="page-404-title"
          >
            404
          </motion.div>
          <div className="page-404-text ">
            The page you are trying to access does not exist
          </div>
          <div>
            {" "}
            <button
              onClick={() => navigate("/signup")}
              className="page-404-btn"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
