import { useNavigate } from "react-router-dom";
const RunPayrollJumbo = () => {
  const navigate = useNavigate();
  return (
    <div className="profle-jumbo ann-jumbo relative app-jumbo  md:flex md:flex-row flex-col  px-10 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 flex flex-col w-full relative">
          <div className="flex justify-between">
            <div className="jumbo-name flex gap-2 items-center">
              <div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4691 6.1203C13.2629 6.25155 4.5754 14.5141 4.36915 14.7828C3.89415 15.3828 3.8754 16.4828 4.3254 17.1516C4.5004 17.4078 13.1941 25.7078 13.4691 25.8828C13.7254 26.0453 14.2754 26.0453 14.5504 25.8766C14.8441 25.6953 15.0004 25.4078 15.0004 25.0203C15.0004 24.8391 14.9691 24.6203 14.9254 24.5328C14.8879 24.4453 13.1129 22.7266 10.9816 20.7016L7.1129 17.0328L17.2629 17.0016C26.9129 16.9703 27.4191 16.9641 27.5816 16.8578C28.1504 16.4891 28.1504 15.5141 27.5816 15.1453C27.4191 15.0391 26.9129 15.0328 17.2754 15.0016L7.1379 14.9703L10.9504 11.3453C13.0504 9.35155 14.8191 7.6328 14.8816 7.5328C15.0441 7.27655 15.0379 6.72655 14.8754 6.45155C14.8066 6.33905 14.6629 6.1953 14.5504 6.12655C14.2754 5.9578 13.7254 5.9578 13.4691 6.1203Z"
                    fill="url(#paint0_linear_1639_227)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1639_227"
                      x1="16.0041"
                      y1="26.0039"
                      x2="16.0041"
                      y2="5.9992"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>Run Payroll</div>
            </div>
          </div>
          <div className="jumbo-dir md:mt-2">
            Payroll <span className="special-jumbo-text">&gt; Run Payroll</span>
          </div>

          <div className="md:absolute pt-1-5 mt-2 right-5 top-5 flex gap-2">
            <button className="new-pay-run px-5 py-1">New Pay Run</button>
            <button
              onClick={() => navigate("/job/maker")}
              className="job-maker-btn px-5 py-1"
            >
              Job Maker
            </button>
            <button className="job-maker-btn px-5 py-1">Finalise STP</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RunPayrollJumbo;
