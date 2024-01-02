import React from "react";

export const SidebarClose = () => {
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
        <g filter="url(#filter0_d_6_790)">
          <rect x="10" y="7" width="30" height="30" rx="15" fill="white" />
          <rect
            x="10.5"
            y="7.5"
            width="29"
            height="29"
            rx="14.5"
            stroke="#EBEBEB"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.7685 28.7577C27.4599 29.0808 26.9596 29.0808 26.6509 28.7577L21.2315 23.0849C20.9228 22.7619 20.9228 22.2381 21.2315 21.9151L26.6509 16.2423C26.9596 15.9192 27.4599 15.9192 27.7685 16.2423C28.0772 16.5653 28.0772 17.0891 27.7685 17.4121L22.9078 22.5L27.7685 27.5879C28.0772 27.9109 28.0772 28.4347 27.7685 28.7577Z"
          fill="#B695F8"
        />
        <defs>
          <filter
            id="filter0_d_6_790"
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
              result="effect1_dropShadow_6_790"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_6_790"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
