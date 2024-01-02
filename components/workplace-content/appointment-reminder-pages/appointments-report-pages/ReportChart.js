import { useState } from "react";
const ReportChart = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [value, setValue] = useState(50); // Initial value

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="custom-chart-container mx-10 shadow">
      <div className="chart-title my-2">Appointment and Occupancy</div>
      <div className="grid grid-cols-12">
        <div className="col-span-11">
          <div className="chart-boxes grid grid-cols-12">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>{" "}
        <div className="col-span-1 ">
          <div className="chart-forecast">--Forecast</div>
        </div>
      </div>
      <div className="range-slider-container">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          className="range-slider"
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-11">
          <div className="custom-chart-x-axis grid grid-cols-12">
            {months.map((month, index) => (
              <div key={index} className="custom-chart-x-label">
                {month}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>

      <div className="chart-percentages my-2 flex gap-2">
        <button className="chart-percent"> 0% </button>
        <button className="chart-percent"> 0% </button>
        <button className="chart-percent"> 0% </button>
        <button className="chart-percent"> 0% </button>
      </div>
    </div>
  );
};

export default ReportChart;
