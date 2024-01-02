import React, { useRef, useState } from "react";
import cropIcon from "../files/cropIcon.svg.svg";
import { motion } from "framer-motion";
import saveIcon from "../files/saveIcon.svg.svg";
import {
  CircleStencil,
  FixedCropper,
  ImageRestriction,
} from "react-advanced-cropper";
import rotateIcon from "../files/rotateIcon.svg";
import { BgTimes } from "utills/svgs/BgTimes";
export const ImageCropper = ({
  image,
  handleCroppedImage,
  width,
  height,
  setShowCroper,
  isCircular,
}) => {
  const cropperRef = useRef();

  const handleCrop = () => {
    handleCroppedImage(cropperRef.current.getCanvas()?.toDataURL());
    setShowCroper(false);
  };

  console.log(image, "blobimg");

  const handleRotate = () => {
    // if (cropperRef.current) {
    //   cropperRef.current.getState()?.transforms = 90
    //   // Rotate the image by 90 degrees clockwise
    //   console.log(
    //     cropperRef.current.getState()?.transforms.rotate,
    //     "croperstate"
    //   );
    // }
  };
  return (
    <div className="img-cropper-container relative  ">
      <div
        onClick={() => setShowCroper(false)}
        className="cursor-pointer ann-btn flex justify-center items-center rounded-md close-croper"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
      <div className="croper-actions">
        {/* <button
            onClick={() => rotate(80)}
            className="secondary-btn px-5 rounded-md text-white flex items-center gap-2"
          >
            {" "}
            Rotate
            <img src={rotateIcon} alt="alt" className="rotate-icon" />{" "}
          </button> */}

        <div
          className="
 add-btn text-white p-2 rounded-md my-2 "
        >
          <div onClick={handleRotate}>
            <img
              src={rotateIcon}
              alt="a"
              className="croper-icon cursor-pointer"
            />
          </div>
        </div>
        {/* <div
          className="
 add-btn text-white p-2 rounded-md my-2 "
        >
          <div>
            <img src={cropIcon} alt="a" className="croper-icon" />
          </div>
        </div> */}
        <div
          onClick={handleCrop}
          className="ann-btn p-2 rounded-md cursor-pointer text-white pb-3"
        >
          <div>
            <img src={saveIcon} alt="a" className="croper-icon" />
          </div>
        </div>
      </div>{" "}
      <motion.div
        initial={{ y: "-80" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, type: "tween" }}
        className="shadow-lg"
      >
        <div className=" cursor-grab ">
          {/* <div className="flex justify-end items-center">
            {" "}
            <BgTimes />{" "}
          </div> */}
          <FixedCropper
            ref={cropperRef}
            src={image}
            backgroundClassName="example__cropper-background"
            stencilProps={{
              handlers: false,
              lines: true,
              movable: true,
              resizable: false,
            }}
            stencilComponent={isCircular && CircleStencil}
            stencilSize={{
              width: width ?? 120,
              height: height ?? 120,
            }}
            imageRestriction={ImageRestriction.stencil}
          />{" "}
          {/* <Cropper
            stencilProps={{
              aspectRatio: 4 / 4,
              overlayClassName: "overlay",
              handlers: true,
              lines: true,
            }}
            style={{ width: "800px", height: "400px" }} // Set your desired width and height here
            crop={{ width: 120, height: 120, x: 0, y: 0, unit: "px" }}
            stencilComponent={CircleStencil}
            ref={cropperRef}
            src={image}
            stencilSize={{
              width: 120,
              height: 120,
            }}
            imageRestriction={ImageRestriction.stencil}
            circle
            guides
            center
            zoom
          /> */}
        </div>
      </motion.div>
    </div>
  );
};
