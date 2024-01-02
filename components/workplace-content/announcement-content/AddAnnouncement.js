import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ImageIcon } from "../../../utills/svgs/ImageIcon";
import { useDispatch, useSelector } from "react-redux";
import { SideTimes } from "utills/svgs/SideTimes";
import { toastHandler } from "responseHanlder";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  USER_TYPE,
} from "utills/globalVars";
import { setSideLoader } from "store/global/globalReducer";
import {
  addNewsThunk,
  uploadWorkSpaceImgThunk,
  uploadWorkSpacepdfThunk,
} from "store/workspace/workspaceNews";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgTimes } from "utills/svgs/BgTimes";

import pdfIcon from "../../../files/pdfIcon.svg";
import { validateTextField } from "utills/FormValidation";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { countWords } from "utills/dataValidation";
const AddAnnouncement = ({ toggleAddAnn, toggleAnnUpdate }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("announcement");
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [newsId, setNewsId] = useState(null);
  const { sideLoader } = useSelector((state) => state.global);
  const [selectedImages, setSelectedImages] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [imagesList, setImagesList] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [descLength, setDescLength] = useState(0);

  const handleFileSelect = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const files = e.target.files;

      setImagesList(files);

      setSelectedFile(file);

      const updatedImages = [...selectedImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();

        reader.onloadend = () => {
          // Add the selected image data URL to the array
          updatedImages.push(reader.result);

          // Set the array of selected images in the state
          setSelectedImages([...updatedImages]);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleSelectPdf = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const filesToAdd = newFiles.filter(
        (file) =>
          !selectedPdf.some((selectedFile) => selectedFile.name === file.name)
      );

      if (filesToAdd.length > 0) {
        setSelectedPdf([...selectedPdf, ...filesToAdd]);
      }
    }
  };

  const uploadPdf = (news_id) => {
    if (selectedPdf) {
      console.log(news_id);
      const formData = new FormData();
      formData.append("uploaded_by", USER_TYPE);
      formData.append("news_id", news_id);
      formData.append("news_docs", selectedPdf);

      dispatch(uploadWorkSpacepdfThunk(formData))
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            toastHandler("Added successfully", ERROR_TYPE_SUCCESS);
            toggleAnnUpdate();
            toggleAddAnn();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setSideLoader(false));
        });
    }
  };

  const addAnn = () => {
    if (titleError) {
      toastHandler("Invalid title ", TOAST_TYPE_ERROR);
      return;
    }
    if (!title) {
      toastHandler("Title is required", TOAST_TYPE_ERROR);
      return;
    }
    if (title.length > 30) {
      toastHandler("Title should be less than 30 character", TOAST_TYPE_ERROR);
      return;
    }
    if (!description) {
      toastHandler("Description is required", TOAST_TYPE_ERROR);
      return;
    }

    if (!type) {
      toastHandler("Type is required", TOAST_TYPE_ERROR);
      return;
    }

    const formData = new FormData();
    formData.append("business_id", business_id.trim());
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("type", type.trim());
    formData.append("uploaded_by", USER_TYPE);

    for (let i = 0; i < imagesList.length; i++) {
      const file = imagesList[i];
      formData.append("news_images", file);
    }

    for (let i = 0; i < selectedPdf.length; i++) {
      const file = selectedPdf[i];
      formData.append("news_docs", file);
    }

    dispatch(setSideLoader(true));
    dispatch(addNewsThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler("Added successfully", TOAST_TYPE_SUCCESS);
          toggleAnnUpdate();
          toggleAddAnn();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  const handleFileRemove = (index) => {
    const newArr = [...selectedPdf];
    newArr.splice(index, 1);
    setSelectedPdf(newArr);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imagesView = [];

  if (selectedImages) {
    for (let i = 0; i < imagesList.length; i++) {
      const newImg = imagesList[i];
      console.log(newImg, "img");
      imagesView.push(
        <div className="img-single-container">
          <img src={newImg} alt="img" />
        </div>
      );
    }
  }

  const handleFileRemoveImg = (index) => {
    const newArr = [...imagesList];
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    newArr.splice(index, 1);
    setImagesList(newArr);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const Imagesitems = [];
  if (imagesList) {
    for (let i = 0; i < imagesList.length; i++) {
      Imagesitems.push(
        <button className="flex items-center gap-1 selected-file ">
          <LinkIcon />
          <span>{imagesList[i]?.name?.slice(0, 10)}</span>
          <span
            onClick={() => handleFileRemoveImg(imagesList[i])}
            className="cursor-pointer"
          >
            <BgTimes />
          </span>{" "}
        </button>
      );
    }
  }

  const handleDescription = (value) => {
    setDescription(value);
    setDescLength(countWords(value));
  };

  return (
    <div className="add-p-side grid grid-cols-6 text-black">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleAddAnn}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add Announcement</div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; Announcements{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Add Announcement
                </span>
              </div>
            </div>
          </div>

          <div className="add-ann-form px-5 ">
            <div>
              <label>Title</label>
            </div>
            <div>
              <input
                onChange={(e) => {
                  if (validateTextField(e.target?.value)) {
                    setTitleError(false);
                  } else {
                    setTitleError(true);
                  }

                  setTitle(e.target?.value);
                }}
                type="text"
                placeholder="Title"
                maxLength={30}
              />
              <div className="error-div mt-1" style={{ fontSize: 12 }}>
                {titleError && title && <span> {"Invalid title"} </span>}
              </div>
            </div>

            <div className="mt-1">
              <label>Description</label>
            </div>

            <div className=" add-ann-form  ">
              <textarea
                placeholder="description"
                className=" p-3 rounded-md"
                id=""
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => handleDescription(e.target.value)}
              ></textarea>
            </div>
            {/* <div className="bio-length">{descLength} / 250 </div> */}

            <div className="mt-1">
              <label>Upload Image</label>
            </div>

            <div>
              <div>
                <div className=" add-ann-img mt-2 ">
                  <label htmlFor="file-input" className="upload-app-label">
                    <div className="add-app-camera flex justify-center">
                      <ImageIcon />
                    </div>
                    <div className="add-app-camera-text mt-2">
                      Click to upload app image
                    </div>
                  </label>
                </div>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  ref={imageInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* <div className="flex flex-wrap  items-center gap-2">
              {Imagesitems}
            </div> */}
            <div>
              {selectedImages.length > 0 && (
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedImages.map((image, index) => (
                      <div className="my-3 thumbnail-wrapper relative ">
                        <div className="absolute right-1 top-1">
                          <div
                            onClick={() => handleFileRemoveImg(index)}
                            className="cursor-pointer"
                          >
                            <BgTimes />
                          </div>
                        </div>
                        <div>
                          <img
                            src={image}
                            alt="alt"
                            className="thumbnail-image cursor-pointer"
                            onClick={() => {
                              setShowModal(true);
                            }}
                          />
                          {showModal && (
                            <ZoomImage
                              src={image}
                              alt="snow"
                              onClose={() => setShowModal(false)}
                            />
                          )}
                        </div>
                        <div className="add-ann-form text-white flex justify-center items-center">
                          {" "}
                          <label>
                            {imagesList[index]?.name?.slice(0, 7)}
                          </label>{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-1">
              <label>Upload Document</label>
            </div>

            <div>
              <div>
                <div className=" add-ann-img mt-2 ">
                  <label htmlFor="file-input-pdf" className="upload-app-label">
                    <div className="add-app-camera flex justify-center">
                      <ImageIcon />
                    </div>
                    <div className="add-app-camera-text mt-2">
                      Click to upload app Document
                    </div>
                  </label>
                </div>

                {/* <div> {selectedFile && <span>{selectedFile}</span>} </div> */}
                <input
                  id="file-input-pdf"
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf"
                  multiple
                  onChange={handleSelectPdf}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {selectedPdf?.length > 0 &&
                selectedPdf?.map((item, index) => {
                  return (
                    <div className=" add-ann-pdf mt-2 relative mb-2  ">
                      <div className="absolute right-1 top-1">
                        <div
                          onClick={() => handleFileRemove(index)}
                          className="cursor-pointer"
                        >
                          {" "}
                          <BgTimes />{" "}
                        </div>
                      </div>
                      <label className="upload-app-label">
                        <div className="add-app-camera flex justify-center">
                          <img
                            src={pdfIcon}
                            alt="alt"
                            style={{ height: 30, width: 30 }}
                          />
                        </div>
                        <div className="add-app-camera-text mt-2">
                          {item.name.slice(0, 8)}
                        </div>
                      </label>
                    </div>
                  );
                })}
            </div>
            <div className="mt-1">
              <label>Is it News or Announcement</label>
            </div>
            <div className="news-ann">
              <select onChange={(e) => setType(e.target.value)}>
                <optgroup>
                  <option value="news">News</option>
                  <option value="announcement" selected>
                    Announcement
                  </option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="my-5 flex justify-center items-center gap-3">
            <button
              disabled={sideLoader ? true : false}
              onClick={addAnn}
              className="add-btn text-white px-5 md:px-20 flex gap-2 py-2 cursor-pointer  rounded-lg"
            >
              Add {sideLoader && <SmallLoaderWhite />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
