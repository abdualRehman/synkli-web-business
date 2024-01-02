import { GridCard } from "components/molecules/GridCard";
import React from "react";

export const TrainingsPage = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 m-5">
        <div>
          <GridCard text="Form Training" />
        </div>
        <div>
          <GridCard text="Tasks Training" />
        </div>
      </div>
    </div>
  );
};
