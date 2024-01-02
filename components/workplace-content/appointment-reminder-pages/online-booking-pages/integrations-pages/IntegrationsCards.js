import { useState } from "react";
const IntegrationsCards = () => {
  const [zoomMeetings, setZoomMeetings] = useState(false);
  const [googleMeetings, setGoogleMeetings] = useState(false);
  const toggleZoomMeetings = () => {
    setZoomMeetings(!zoomMeetings);
  };

  const toggleGoogleMeetings = () => {
    setGoogleMeetings(!googleMeetings);
  };
  return (
    <div className="mx-10 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="integrations-card relative p-3">
          <div className="absolute right-3 top-3">
            <div>
              <input
                checked={zoomMeetings}
                className="os-react-switch-checkbox"
                id={`HandleToggle-$ react-switch-new`}
                type="checkbox"
                onChange={toggleZoomMeetings}
              />

              <label
                style={{ background: zoomMeetings && "#B695F8" }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
                onClick={toggleZoomMeetings}
              >
                <span className={`react-switch-button`} />
              </label>
            </div>
          </div>
          <div className="meeting-svg">
            <svg
              width="55"
              height="55"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="75" height="75" rx="37.5" fill="#2D8CFF" />
              <path
                d="M58.4364 50.0137C59.413 50.2603 60.2675 49.7671 60.7558 49.0274C61 48.6575 61 48.0411 61 46.6849V28.0685C61 26.7123 61 26.2192 60.7558 25.726C60.3896 24.7397 59.413 24.3699 58.4364 24.7397C55.8727 26.4658 50.2571 31.5205 50.1351 33.6164C50.0374 33.9863 50.0374 34.6027 50.0374 35.4658V40.1507C50.0374 41.137 50.0374 41.5068 50.1351 42C50.2571 42.9863 50.6234 43.8493 51.1117 44.3425C52.5766 45.4521 57.4597 49.8904 58.5584 49.8904L58.4364 50.0137ZM14 29.0548C14 27.2055 14 26.2192 14.3662 25.726C14.6104 25.2329 15.3429 24.7397 15.7091 24.3699C16.1974 24 17.0519 24 19.0052 24H34.7532C39.3922 24 41.7117 24 43.5429 24.9863C44.8857 25.9726 46.3506 26.8356 47.2052 28.6849C48.1818 30.5342 48.1818 32.8767 48.1818 37.5616V45.9452C48.1818 47.7945 48.1818 48.7808 47.8156 49.274C47.5714 49.7671 46.839 50.2603 46.4727 50.6301C45.9844 51 45.1299 51 43.1766 51H27.4286C22.7896 51 20.4701 51 18.639 50.0137C17.2961 49.0274 15.8312 48.1644 14.9766 46.3151C14 44.4658 14 42.1233 14 37.4384V29.0548Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="meeting-title mt-2">Zoom Meeting</div>
          <div className="meeting-text mt-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, illo!
          </div>
        </div>
        <div className="integrations-card relative p-3">
          <div className="absolute right-3 top-3">
            <div>
              <input
                checked={googleMeetings}
                className="os-react-switch-checkbox"
                id={`HandleToggle-$ react-switch-new`}
                type="checkbox"
                onChange={toggleGoogleMeetings}
              />

              <label
                style={{ background: googleMeetings && "#B695F8" }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
                onClick={toggleGoogleMeetings}
              >
                <span className={`react-switch-button`} />
              </label>
            </div>
          </div>
          <div className="meeting-svg">
            <svg
              width="65"
              height="50"
              viewBox="0 0 90 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50.7344 36.541L59.4391 46.3947L71.2112 53.8672L73.2837 36.6231L71.2112 19.7896L59.2733 26.3587L50.7344 36.541Z"
                fill="#00832D"
              />
              <path
                d="M0 52.2243V66.9228C0 70.2895 2.73577 72.9993 6.13475 72.9993H20.9742L24.0416 61.9138L21.0571 52.2243L10.8602 49.186L0 52.2243Z"
                fill="#0066DA"
              />
              <path
                d="M21.0571 0L0 20.775L10.7773 23.8133L20.9742 20.775L23.9587 11.2497L21.0571 0Z"
                fill="#E94235"
              />
              <path
                d="M21.0571 20.7749H0V52.2248H20.9742V20.7749H21.0571Z"
                fill="#2684FC"
              />
              <path
                d="M84.5576 8.78633L71.1275 19.7076V53.8673L84.5576 64.7886C86.5472 66.3488 89.5317 64.9528 89.5317 62.4073V11.1677C89.6146 8.6221 86.6301 7.14404 84.5576 8.78633ZM50.7336 36.5411V52.225H21.0547V73.0001H65.0756C68.4746 73.0001 71.2104 70.2903 71.2104 66.9236V53.8673L50.7336 36.5411Z"
                fill="#00AC47"
              />
              <path
                d="M65.0756 0H21.0547V20.775H50.7336V36.4589L71.2104 19.6254V6.07649C71.2104 2.70979 68.4746 0 65.0756 0Z"
                fill="#FFBA00"
              />
            </svg>
          </div>

          <div className="meeting-title mt-2">Google Meeting</div>
          <div className="meeting-text mt-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, illo!
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsCards;
