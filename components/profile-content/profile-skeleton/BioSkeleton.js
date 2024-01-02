import React from "react";
import "./css/profile-skeleton.css";
import { useState, useEffect } from "react";
export const BioSkeleton = ({ lines }) => {
  const [divs, setDivs] = useState([]);

  useEffect(() => {
    const divElements = Array.from({ length: lines }, (_, index) => (
      <div key={index} className=" bio-details-skeleton-name"></div>
    ));
    setDivs(divElements);
  }, [lines]);

  return (
    <div>
      <div>
        <div className="flex  gap-3 flex-col flex-wrap">{divs}</div>
      </div>
    </div>
  );
};
