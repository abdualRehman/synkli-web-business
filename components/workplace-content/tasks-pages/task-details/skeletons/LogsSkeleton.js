import React, { useState } from "react";
import "./skeleton.css";
export const LogsSkeleton = () => {
  const [logsSpin, setLogsSpin] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div>
      {" "}
      {logsSpin?.map((spin, index) => (
        <div key={index}>
          <div className="flex gap-5 items-center  details-skeleton profile-skeleton p-5">
            <div>
              {" "}
              <div className="profile-skeleton-details-logs"></div>{" "}
            </div>
            <div className="flex gap-3 flex-col  ">
              <div className="team-details-skeleton-name profile-details-skeleton-name"></div>
              <div className="flex items-center gap-3 flex-wrap">
                {" "}
                <div className="team-details-skeleton-name-logs "></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
