import "./css/announcement.css";

// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AnnouncementJumbo = (props) => {
  const { toggleAddAnn } = props;

  return (
    <div className="  flex  md:md-10 mx-5 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 ">
          <div className="jumbo-name">Announcements</div>
          <div className="jumbo-dir mt-2">
            Workspace{" "}
            <span className="special-jumbo-text">&gt; Announcements</span>
          </div>
        </div>
      </div>
      <div className=" flex md:items-center flex-col md:flex-row gap-3 ml-3">
        <button
          onClick={toggleAddAnn}
          className="flex add-announcement gap-2 items-center  "
        >
          {" "}
          <span>
            <svg
              width="13"
              height="16"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.10714 2.36914H2.36905C2.00595 2.36914 1.65773 2.51338 1.40099 2.77013C1.14424 3.02687 1 3.37509 1 3.73819V18.7977C1 19.1608 1.14424 19.509 1.40099 19.7658C1.65773 20.0225 2.00595 20.1668 2.36905 20.1668H16.0595C16.4226 20.1668 16.7708 20.0225 17.0276 19.7658C17.2843 19.509 17.4286 19.1608 17.4286 18.7977V3.73819C17.4286 3.37509 17.2843 3.02687 17.0276 2.77013C16.7708 2.51338 16.4226 2.36914 16.0595 2.36914H13.3214"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.84542 7.84524H14.6907M7.84542 11.9524H14.6907M7.84542 16.0595H14.6907M3.73828 7.84524H5.10733M3.73828 11.9524H5.10733M3.73828 16.0595H5.10733M6.47638 1H11.9526C12.3157 1 12.6639 1.14424 12.9206 1.40098C13.1774 1.65773 13.3216 2.00595 13.3216 2.36905C13.3216 2.73214 13.1774 3.08036 12.9206 3.33711C12.6639 3.59386 12.3157 3.7381 11.9526 3.7381H6.47638C6.11328 3.7381 5.76506 3.59386 5.50831 3.33711C5.25157 3.08036 5.10733 2.73214 5.10733 2.36905C5.10733 2.00595 5.25157 1.65773 5.50831 1.40098C5.76506 1.14424 6.11328 1 6.47638 1Z"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
          </span>
          <span className="flex items-center  justify-center gap-1">
            <span>Add</span> <span>Announcements</span>{" "}
          </span>{" "}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementJumbo;
