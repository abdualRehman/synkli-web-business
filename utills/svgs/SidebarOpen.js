import React from "react";

export const SidebarOpen = () => {
  return (
    <div>
      <svg
        width="30"
        height="30"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_6_790)">
          <rect
            x="40"
            y="37"
            width="30"
            height="30"
            rx="15"
            transform="rotate(-180 40 37)"
            fill="white"
          />
          <rect
            x="39.5"
            y="36.5"
            width="29"
            height="29"
            rx="14.5"
            transform="rotate(-180 39.5 36.5)"
            stroke="#EBEBEB"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22.2315 15.2423C22.5401 14.9192 23.0404 14.9192 23.3491 15.2423L28.7685 20.9151C29.0772 21.2381 29.0772 21.7619 28.7685 22.0849L23.3491 27.7577C23.0404 28.0808 22.5401 28.0808 22.2315 27.7577C21.9228 27.4347 21.9228 26.9109 22.2315 26.5879L27.0922 21.5L22.2315 16.4121C21.9228 16.0891 21.9228 15.5653 22.2315 15.2423Z"
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
