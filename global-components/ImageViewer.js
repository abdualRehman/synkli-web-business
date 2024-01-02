import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ImageViewer = ({ togglePreviewAddImg }) => {
  const { image } = useSelector((state) => state.global);
  const [images, setImages] = useState([
    "https://fastly.picsum.photos/id/983/200/300.jpg?hmac=VWTT5PL8-LbE61s9R905V7X4BFr97P-ZFZCzb-Zpj6k",
    "https://fastly.picsum.photos/id/983/200/300.jpg?hmac=VWTT5PL8-LbE61s9R905V7X4BFr97P-ZFZCzb-Zpj6k",
    "https://fastly.picsum.photos/id/983/200/300.jpg?hmac=VWTT5PL8-LbE61s9R905V7X4BFr97P-ZFZCzb-Zpj6k",
  ]);
  return (
    <div className="img-view-container relative">
      <div className="absolute right-5 top-5 scale-150 ">
        <div onClick={togglePreviewAddImg} className="cursor-pointer">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <img src={image} className="img-viewer" />
    </div>
  );
};
