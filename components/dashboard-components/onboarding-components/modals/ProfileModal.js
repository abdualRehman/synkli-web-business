import React from "react";
import { DisableIcon } from "utills/svgs/DisableIcon";
import { SmallTick } from "utills/svgs/SmallTick";
import { motion } from "framer-motion";
import { BlueTick } from "utills/svgs/BlueTick";
import { IncompleteCircle } from "utills/svgs/IncompleteCircle";
export const ProfileModal = ({ profileData, toggleAddProfileSide }) => {
  console.log(profileData, "pppppppp");
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: "20" }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0, type: "tween", duration: 0.3 }}
      className="main-profile-modal "
      onClick={toggleAddProfileSide}
    >
      <div className="w-full h-full relative">
        <div className="p-2 dimmed-fonts">
          <div className="text-black mb-2">
            <p className="progress-label">Profile Progress</p>
          </div>{" "}
          <div className="modal-border"></div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <label>Profile Image</label>
            </div>
            <div>{profileData?.image ? <BlueTick /> : <IncompleteCircle />}</div>
          </div>
          <div className="modal-border"></div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div>
              <label>User name</label>
            </div>
            <div>
              {!profileData?.first_name ? <IncompleteCircle /> : <BlueTick /> } 
            </div>
          </div>{" "}
          <div className="modal-border"></div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <label>Date Of Birth</label>
            </div>
            <div>
              {profileData?.date_of_birth ? <BlueTick /> : <IncompleteCircle />}
            </div>
          </div>
          <div className="modal-border"></div>
          <div className="flex items-center justify-between gap-5">
            <div>
              <label>Personal Mobile No</label>
            </div>
            <div>
              {!profileData?.phone_number ? <IncompleteCircle /> : <BlueTick />}
            </div>
          </div>
        </div>
        <div className="arrow-down-modal"></div>
      </div>
    </motion.div>
  );
};
