import React from "react";

export const Burger = () => {
  return (
    <div>
      {" "}
      <svg
        width="14"
        height="11"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="12"
          width="20"
          height="4"
          rx="2"
          fill="url(#paint0_linear_1314_147)"
        />
        <rect
          y="6"
          width="20"
          height="4"
          rx="2"
          fill="url(#paint1_linear_1314_147)"
        />
        <rect
          width="20"
          height="4"
          rx="2"
          fill="url(#paint2_linear_1314_147)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1314_147"
            x1="10.9813"
            y1="12.0497"
            x2="10.9807"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#101828" />
            <stop offset="0.998509" stop-color="#0D1B37" />
            <stop offset="1" stop-color="#0A1E46" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1314_147"
            x1="10.9813"
            y1="6.04968"
            x2="10.9807"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#101828" />
            <stop offset="0.998509" stop-color="#0D1B37" />
            <stop offset="1" stop-color="#0A1E46" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1314_147"
            x1="10.9813"
            y1="0.049676"
            x2="10.9807"
            y2="4.00001"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#101828" />
            <stop offset="0.998509" stop-color="#0D1B37" />
            <stop offset="1" stop-color="#0A1E46" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
