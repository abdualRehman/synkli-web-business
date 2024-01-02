import "../../dashboard-css/subsSuccess.css";
import AppSidebar from "../../appSidebarComp/AppSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DashboardWelcomeCard } from "../../../pages/dashboard/dashboard-cards/DashboardWelcomeCard";
const SubsSuccessPage = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dashboard-page">
      <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="main-grid-container">
        <div className="one "></div>
        <div className="two shadow-md">
          <DashboardWelcomeCard />
        </div>
        <div className="three shadow-md relative">
          <div className="success-upper">
            <div className="success-svg-container">
              <svg
                width="170"
                height="110"
                viewBox="0 0 197 171"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9382 0.956055C7.53195 3.1582 2.7673 8.2832 0.965541 14.8896C0.124721 18.0928 0.124721 101.254 1.00558 104.497C2.7673 111.184 7.85226 116.549 14.2985 118.551C16.821 119.312 17.9821 119.352 49.6931 119.352C72.9558 119.352 82.7253 119.231 83.446 118.911C85.8484 117.79 86.2888 114.026 84.2468 112.104L83.2058 111.144L50.1335 110.943L17.0212 110.743L14.8191 109.502C13.6179 108.821 12.0163 107.5 11.3357 106.579C8.73312 103.216 8.8132 104.257 8.8132 67.4209V34.0684H89.8923H170.971V49.083C170.971 65.2188 171.051 66.0996 173.013 67.4609C174.215 68.3018 176.537 68.3018 177.738 67.4609C179.74 66.0195 179.78 65.7793 179.78 41.9961C179.78 29.3838 179.58 18.6533 179.38 17.0518C178.258 9.4043 172.253 2.55762 164.805 0.595703C163.124 0.155273 150.231 0.0351562 89.6921 0.0351562L16.6208 0.0751953L13.9382 0.956055ZM163.364 9.08398C164.926 9.56445 166.007 10.2451 167.568 11.7666C170.251 14.4893 170.971 16.5312 170.971 21.7363V25.6602H89.8923H8.8132V22.1367C8.8132 15.0098 11.2556 10.9658 16.781 9.00391C17.9421 8.56348 32.3161 8.4834 89.7321 8.44336C153.795 8.44336 161.442 8.52344 163.364 9.08398Z"
                  fill="url(#paint0_linear_6_790)"
                />
                <path
                  d="M19.7451 68.7393C18.584 69.3399 17.2227 71.3419 17.2227 72.503C17.2227 73.7042 18.584 75.7061 19.8252 76.2667C21.667 77.1475 38.1631 77.1876 40.2051 76.3467C41.9268 75.626 42.8477 74.3048 42.8477 72.503C42.8477 70.7012 41.9268 69.38 40.2051 68.6592C38.1631 67.8184 21.5068 67.8585 19.7451 68.7393Z"
                  fill="url(#paint1_linear_6_790)"
                />
                <path
                  d="M141.543 77.5085C134.777 78.7498 126.889 82.1531 121.724 86.0769C118.361 88.5994 113.156 94.0447 110.953 97.2878C108.391 101.052 105.468 107.418 104.267 111.942C102.866 117.227 102.505 126.156 103.426 131.561C104.587 138.048 107.35 144.934 111.034 150.38C113.156 153.503 118.441 158.948 121.724 161.43C124.967 163.873 130.933 166.956 135.057 168.357C144.146 171.36 155.357 171.36 164.366 168.357C171.252 166.075 176.858 162.672 182.103 157.627C187.909 152.061 191.712 146.095 194.235 138.648C197.358 129.399 197.438 118.308 194.355 109.139C192.953 104.935 189.87 98.9695 187.428 95.7263C184.946 92.4431 179.5 87.158 176.377 85.0359C171.012 81.4324 164.045 78.5896 157.839 77.5085C153.755 76.7878 145.427 76.7878 141.543 77.5085ZM156.278 85.9167C171.172 88.5193 182.944 99.4099 187.068 114.505C188.309 118.909 188.309 128.598 187.068 133.003C183.144 147.297 172.574 157.707 158.32 161.27C154.116 162.311 144.947 162.231 140.662 161.11C131.013 158.548 122.725 152.662 117.56 144.694C109.512 132.242 109.312 116.226 116.999 103.734C125.247 90.321 140.903 83.2341 156.278 85.9167Z"
                  fill="url(#paint2_linear_6_790)"
                />
                <path
                  d="M164.765 115.786C164.325 116.026 160.761 119.429 156.877 123.273L149.79 130.32L144.465 125.075C140.662 121.391 138.74 119.789 137.859 119.589C135.016 118.949 132.133 121.831 132.774 124.674C132.974 125.635 134.856 127.797 139.861 132.842C143.584 136.646 147.268 140.009 148.029 140.37C150.631 141.611 151.192 141.21 160.881 131.601C165.806 126.756 170.09 122.272 170.411 121.671C171.972 118.708 170.17 115.345 167.087 115.345C166.246 115.345 165.205 115.585 164.765 115.786Z"
                  fill="url(#paint3_linear_6_790)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6_790"
                    x1="98.8642"
                    y1="117.87"
                    x2="98.8048"
                    y2="0.0348639"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_6_790"
                    x1="31.2925"
                    y1="76.8426"
                    x2="31.2901"
                    y2="68.0528"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_6_790"
                    x1="154.368"
                    y1="169.446"
                    x2="154.298"
                    y2="76.9678"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_6_790"
                    x1="153.713"
                    y1="140.558"
                    x2="153.7"
                    y2="115.345"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#101828" />
                    <stop offset="0.998509" stop-color="#0D1B37" />
                    <stop offset="1" stop-color="#0A1E46" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>Payment Method Verified Successfully</div>
          </div>

          <div className="continue">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-12 py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        </div>
        <div className="four"></div>
      </div>
    </div>
  );
};

export default SubsSuccessPage;
