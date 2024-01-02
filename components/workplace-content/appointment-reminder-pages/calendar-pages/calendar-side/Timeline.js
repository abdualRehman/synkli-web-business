import { DimmedDeleteIcon } from "../../../../../utills/svgs/DimmedDeleteIcon";
import { FontIcon } from "../../../../../utills/svgs/FontIcon";
import { MemoryCardIcon } from "../../../../../utills/svgs/MemoryCardIcon";
import { TimesIcon } from "../../../../../utills/svgs/TimesIcon";

const Timeline = () => {
  return (
    <div className="px-5 py-5 timeline-side">
      <div className="timeline-container p-3">
        <div className="flex justify-between">
          <div className="timeline-title"> John Doe</div>
          <div className="timeline-date"> Aug 10 at 8:12 AM </div>
        </div>
        <div className="timeline-text flex justify-between mt-2">
          <div>Date Inserted</div>
          <div> 23/02/2022, 01:09 PM (CAST) </div>
        </div>
        <div className="timeline-text flex justify-between mt-2">
          <div>Source</div>
          <div>Employee Name</div>
        </div>
        <div className="timeline-text flex justify-between mt-2">
          <div>Sequence</div>
          <div>BOOKING</div>
        </div>
      </div>

      <div className="timeline-lower-buttons">
        <div className="mt-10 flex gap-2 justify-center items-center">
          <button className="s-btn flex gap-2">
            {" "}
            <span>
              <MemoryCardIcon />
            </span>{" "}
            <span>Save</span>{" "}
          </button>
          <button className="mt-btn flex gap-1">
            {" "}
            <span>
              <FontIcon />
            </span>{" "}
            <span className="flex gap-1">
              {" "}
              <span>Manual</span> <span>Text</span>{" "}
            </span>{" "}
          </button>{" "}
          <br />
        </div>

        <div className="mt-2 mb-5 flex gap-2 justify-center items-center">
          <button className="d-btn flex gap-2">
            {" "}
            <span>
              {" "}
              <DimmedDeleteIcon />
            </span>{" "}
            <span>Delete</span>{" "}
          </button>
          <button className="d-btn flex gap-2">
            {" "}
            <span>
              <TimesIcon />
            </span>{" "}
            <span>Cancel</span>{" "}
          </button>{" "}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
