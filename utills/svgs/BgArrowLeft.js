import React from "react";

export const BgArrowLeft = () => {
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
        <g filter="url(#filter0_d_145_7053)">
          <rect x="10" y="7" width="30" height="30" rx="15" fill="white" />
          <rect
            x="10.5"
            y="7.5"
            width="29"
            height="29"
            rx="14.5"
            stroke="#F3F3F3"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M26.8016 27.795C26.5371 28.0683 26.1082 28.0683 25.8437 27.795L21.1984 22.9949C20.9339 22.7216 20.9339 22.2784 21.1984 22.0051L25.8437 17.205C26.1082 16.9317 26.5371 16.9317 26.8016 17.205C27.0661 17.4783 27.0661 17.9215 26.8016 18.1949L22.6353 22.5L26.8016 26.8051C27.0661 27.0785 27.0661 27.5217 26.8016 27.795Z"
          fill="black"
        />
        <defs>
          <filter
            id="filter0_d_145_7053"
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
              result="effect1_dropShadow_145_7053"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_145_7053"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
