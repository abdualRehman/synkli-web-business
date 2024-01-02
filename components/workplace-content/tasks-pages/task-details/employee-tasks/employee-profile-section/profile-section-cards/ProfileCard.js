import { SmallLoader } from "components/common/SmallLoader";
import React from "react";
import { Envelope } from "utills/svgs/Envelope";
import { Phone } from "utills/svgs/Phone";

export const ProfileCard = ({ empInfo }) => {
  console.log(empInfo, "empinfo");
  return (
    <div className="p-5 ">
      {!empInfo ? (
        <div className="flex justify-center items-center h-full"> </div>
      ) : (
        <div>
          {" "}
          <div className="flex items-center justify-center flex-col gap-5">
            {" "}
            <div className="profile-image-section">
              <img
                src={empInfo && empInfo[0]?.image}
                alt="profile"
                className="profile-section-img"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="profile-section-line">
              <hr />
            </div>
          </div>
          <div className="profile-section-info ">
            <div className="flex gap-3 items-center flex-wrap">
              <div>
                <Envelope />
              </div>
              <div>{empInfo && empInfo[0]?.email}</div>
            </div>
            <div className="flex gap-3 items-center flex-wrap mt-2">
              <div>
                <Phone />
              </div>
              <div>
                {empInfo && empInfo[0]?.phone_number
                  ? empInfo[0]?.phone_number
                  : "No phone number found"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
