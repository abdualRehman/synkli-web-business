import React from "react";
import { motion } from "framer-motion";
import { SmallTick } from "utills/svgs/SmallTick";
import { DisableIcon } from "utills/svgs/DisableIcon";
import { BlueTick } from "utills/svgs/BlueTick";
import { IncompleteCircle } from "utills/svgs/IncompleteCircle";
export const BranchesModal = ({ branches, toggleBranchSide }) => {
  console.log(branches, "ppp");
  return (
    <div>
      {" "}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: "20" }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0, type: "tween", duration: 0.3 }}
        className="main-profile-modal "
        onClick={toggleBranchSide}
      >
        <div className="w-full h-full relative">
          <div className="p-2 dimmed-fonts">
            <div className="text-black mb-2">
              <p className="progress-label">Branches Progress</p>
            </div>{" "}
            <div className="modal-border"></div>
            <div className="flex items-center justify-between gap-5">
              <div>
                <label>Atleast one branch</label>
              </div>
              <div>
                {branches?.length >= 1 ? <BlueTick /> : <IncompleteCircle />}
              </div>
            </div>
          </div>
          <div className="arrow-down-modal"></div>
        </div>
      </motion.div>
    </div>
  );
};
