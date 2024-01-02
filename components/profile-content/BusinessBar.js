import "./css/business.css";

const BusinessBar = ({ condition, handleCondition }) => {
  const changeCondition = () => {
    handleCondition(1);
  };

  const setBusinessHours = () => {
    handleCondition(2);
  };

  const setServices = () => {
    handleCondition(3);
  };

  const setPhotos = () => {
    handleCondition(4);
  };

  function showBranchLocations() {
    handleCondition(5);
  }
  return (
    <div className="md:px-10 px-5  w-full">
      <div className="business-bar   px-3 shadow">
        <div
          onClick={changeCondition}
          className={`flex bar-heading justify-center items-center cursor-pointer ${
            condition === 1 ? "add-border" : ""
          }`}
        >
          Bio
        </div>

        <div
          onClick={setBusinessHours}
          className={`flex  justify-center items-center cursor-pointer ${
            condition === 2 ? "add-border" : ""
          }`}
        >
          Business Hours
        </div>

        <div
          onClick={setServices}
          className={`flex  justify-center items-center cursor-pointer ${
            condition === 3 ? "add-border" : ""
          }`}
        >
          Services
        </div>

        <div
          onClick={setPhotos}
          className={`flex  justify-center items-center cursor-pointer ${
            condition === 4 ? "add-border" : ""
          }`}
        >
          Workplace Photos
        </div>

        <div
          onClick={showBranchLocations}
          className={`flex justify-center items-center cursor-pointer  ${
            condition === 5 ? "add-border" : ""
          }`}
        >
          Branch Locations
        </div>
      </div>
    </div>
  );
};

export default BusinessBar;
