import React from "react";

export const BgArrowRight = () => {
  return (
    <div>
      {" "}
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_145_7056)">
          <rect
            x="40"
            y="37"
            width="30"
            height="30"
            rx="15"
            transform="rotate(180 40 37)"
            fill="white"
          />
          <rect
            x="39.5"
            y="36.5"
            width="29"
            height="29"
            rx="14.5"
            transform="rotate(180 39.5 36.5)"
            stroke="#F3F3F3"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.1984 16.205C23.4629 15.9317 23.8918 15.9317 24.1563 16.205L28.8016 21.0051C29.0661 21.2784 29.0661 21.7216 28.8016 21.9949L24.1563 26.795C23.8918 27.0683 23.4629 27.0683 23.1984 26.795C22.9339 26.5217 22.9339 26.0785 23.1984 25.8051L27.3647 21.5L23.1984 17.1949C22.9339 16.9215 22.9339 16.4783 23.1984 16.205Z"
          fill="#B695F8"
        />
        <defs>
          <filter
            id="filter0_d_145_7056"
            x="0"
            y="0"
            width="50"
            height="50"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_145_7056"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_145_7056"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
