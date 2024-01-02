import React from "react";
import { motion } from "framer-motion";
import { SmallTick } from "utills/svgs/SmallTick";
import { DisableIcon } from "utills/svgs/DisableIcon";
import { BlueTick } from "utills/svgs/BlueTick";
import { IncompleteCircle } from "utills/svgs/IncompleteCircle";
export const BusinessModal = ({ businessData , toggleBusinessSide}) => {
  console.log(businessData, "ppp");
  return (
    <div>
      {" "}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: "20" }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0, type: "tween", duration: 0.3 }}
        className="main-profile-modal "
        onClick={toggleBusinessSide}
      >
        <div className="w-full h-full relative">
          <div className="p-2 dimmed-fonts">
            <div className="text-black mb-2">
              <p className="progress-label">Business Profile Progress</p>
            </div>{" "}
            <div className="modal-border"></div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <label>Business Logo</label>
              </div>
              <div>{businessData?.logo ? <BlueTick /> : <IncompleteCircle />}</div>
            </div>
            <div className="modal-border"></div>
            <div className="flex items-center justify-between flex-wrap gap-5">
              <div>
                <label>Business name</label>
              </div>
              <div>{businessData?.name ? <BlueTick /> : <IncompleteCircle />}</div>
            </div>{" "}
            <div className="modal-border"></div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <label>Phone </label>
              </div>
              <div>
                {businessData?.phone_number ? <BlueTick /> : <IncompleteCircle />}
              </div>
            </div>
            <div className="modal-border"></div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <label>Website</label>
              </div>
              <div>
                {businessData?.website ? <BlueTick /> : <IncompleteCircle />}
              </div>
            </div>
            <div className="modal-border"></div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <label>Address</label>
              </div>
              <div>
                {businessData?.address ? <BlueTick /> : <IncompleteCircle />}
              </div>
            </div>
            <div className="modal-border"></div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <label>Bio</label>
              </div>
              <div>
                {businessData?.description ? <BlueTick /> : <IncompleteCircle />}
              </div>
            </div>
          </div>
          <div className="arrow-down-modal"></div>
        </div>
      </motion.div>
    </div>
  );
};
