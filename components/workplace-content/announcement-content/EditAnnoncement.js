import React, { useEffect } from "react";
import { SideTimes } from "utills/svgs/SideTimes";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BUSINESS_ID, TOAST_TYPE_SUCCESS, USER_TYPE } from "utills/globalVars";
import { setLoader } from "store/global/globalReducer";
import {
  deleteAnnFileThunk,
  getSingleNews,
  updateNewsThunk,
} from "store/workspace/workspaceNews";
import pdfIcon from "../../../files/pdfIcon.svg";
import { toastHandler } from "responseHanlder";
import { AddFileModal } from "./cards/AddFileModal";
import { WhiteBgTimes } from "utills/svgs/WhiteBgTimes";
import _ from "lodash";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import ConfirmationModal from "utills/confirmationModal";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";

export const EditAnnoncement = ({ toggleEditAnn, toggleAnnUpdate }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getSingleNews);
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [showModal, setShowModal] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [pdfList, setPdfList] = useState([]);
  const [imagesView, setimagesView] = useState([]);
  const [pdfView, setPdfView] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [news_file_id, set_news_file_id] = useState("");
  const [imageZoom, setImageZoom] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const updateNews = () => {
    const formData = new FormData();

    formData.append("business_id", business_id);
    formData.append("news_id", data?.news_id);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("type", data?.type);

    for (let i = 0; i < imagesList.length; i++) {
      const file = imagesList[i];
      formData.append("news_images", file);
    }

    for (let i = 0; i < pdfList.length; i++) {
      const file = pdfList[i];
      formData.append("news_docs", file);
    }

    formData.append("uploaded_by", USER_TYPE);

    dispatch(setLoader(true));
    dispatch(updateNewsThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleEditAnn();

          toggleAnnUpdate();
          toastHandler("News updated successfully", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  console.log(imagesList, "---");
  const handleFileRemove = (index, type) => {
    if (type === "pdf") {
      const newArr = [...pdfList];
      newArr.splice(index, 1);
      setPdfList(newArr);
      fileView(type);
    }
    if (type === "image") {
      const newSelected = [...selectedImages];
      newSelected.splice(index, 1);
      setSelectedImages(newSelected);
      const newArr = [...imagesList];
      newArr.splice(index, 1);
      setImagesList(newArr);
      fileView(type);
    }
  };
  const fileView = (type) => {
    const items = [];
    if (type === "pdf") {
      if (pdfList) {
        for (let i = 0; i < pdfList.length; i++) {
          items.push(
            <button className="flex items-center gap-1 selected-file ">
              <LinkIcon />
              <span>{pdfList[i]?.name?.slice(0, 10)}</span>
              <span
                onClick={() => handleFileRemove(pdfList[i], "pdf")}
                className="cursor-pointer"
              >
                <BgTimes />
              </span>{" "}
            </button>
          );
        }
      }
      setPdfView(items);
    }
    if (type === "image") {
      if (imagesList) {
        for (let i = 0; i < imagesList.length; i++) {
          items.push(
            <button className="flex items-center gap-1 selected-file ">
              <LinkIcon />
              <span>{imagesList[i]?.name?.slice(0, 10)}</span>
              <span
                onClick={() => handleFileRemove(imagesList[i], "image")}
                className="cursor-pointer"
              >
                <BgTimes />
              </span>{" "}
            </button>
          );
        }
      }
      setimagesView(items);
    }
  };
  useEffect(() => {
    fileView("image");
    fileView("pdf");
  }, [imagesList, pdfList]);
  const [delLoader, setDelLoader] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleFileDelete = () => {
    setDeleteId(news_file_id);
    setDelLoader(true);
    dispatch(deleteAnnFileThunk({ news_file_id }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          const findFile = data?.attachments?.find(
            (file) => file.news_file_id === news_file_id
          );
          const newObj = _.cloneDeep(data);
          const index = newObj.attachments.indexOf(findFile);
          newObj.attachments.splice(index, 1);
          dispatch(getSingleNews.actions.handleUpdate(newObj));
        }
      })
      .catch((error) => {})
      .finally(() => {
        setIsConfirmationOpen(false);
        setDelLoader(false);
      });
  };

  const deleteFile = (news_id) => {
    set_news_file_id(news_id);
    setIsConfirmationOpen(true);
  };
  return (
    <>
      <div className="add-p-side grid grid-cols-6 ">
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
                onClick={() => toggleEditAnn()}
                className="absolute text-white p-2 right-1 top-1 cursor-pointer"
              >
                <SideTimes />
              </div>

              <div className="add-detail pt-10 px-5">
                <div className="title">{data?.title}</div>

                <div className="jumbo-dir mt-2">
                  Workspace &gt; Announcements{" "}
                  <span className="special-jumbo-text">
                    {" "}
                    &gt; Announcement Details
                  </span>
                </div>
              </div>
            </div>

            <div className=" px-5 ">
              <div className="add-ann-form">
                <label>Title</label>
              </div>
              <div className="add-ann-form">
                <input
                  value={title}
                  type="text"
                  placeholder="Title"
                  name={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mt-1 add-ann-form">
                <label>Description</label>
              </div>

              <div className="description-wrapper">
                <textarea
                  className="description-area"
                  id={data?.news_id}
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                {showModal && (
                  <div className="absolute right-8 bottom-4">
                    <AddFileModal
                      pdfList={pdfList}
                      toggleModal={toggleModal}
                      selectedImages={selectedImages}
                      setImagesList={setImagesList}
                      setSelectedImages={setSelectedImages}
                      imagesList={imagesList}
                      setPdfList={setPdfList}
                    />
                  </div>
                )}
                <div
                  onClick={toggleModal}
                  className="description-svg cursor-pointer"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.2"
                      width="32"
                      height="32"
                      rx="16"
                      fill="#B695F8"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.9442 8.17458C16.7136 7.42251 17.757 7 18.845 7C19.933 7 20.9764 7.42251 21.7457 8.17458C22.515 8.92665 22.9472 9.94668 22.9472 11.0103C22.9472 12.0739 22.515 13.0939 21.7457 13.846L14.6501 20.7825C14.431 20.9967 14.1709 21.1667 13.8847 21.2827C13.5984 21.3986 13.2916 21.4584 12.9817 21.4584C12.3559 21.4585 11.7556 21.2156 11.313 20.7831C10.8704 20.3506 10.6217 19.7639 10.6216 19.1521C10.6215 18.5403 10.87 17.9535 11.3124 17.5209L18.1961 10.7904L19.0687 11.6434L12.1838 18.3727C12.0792 18.475 11.9962 18.5964 11.9395 18.7301C11.8829 18.8638 11.8537 19.007 11.8537 19.1517C11.8537 19.2963 11.8829 19.4396 11.9395 19.5732C11.9962 19.7069 12.0792 19.8283 12.1838 19.9306C12.2884 20.0329 12.4127 20.1141 12.5494 20.1694C12.6861 20.2248 12.8326 20.2533 12.9806 20.2533C13.1286 20.2533 13.2752 20.2248 13.4119 20.1694C13.5486 20.1141 13.6728 20.0329 13.7775 19.9306L20.8731 12.9941C21.1396 12.7336 21.351 12.4243 21.4952 12.0839C21.6394 11.7435 21.7137 11.3787 21.7137 11.0103C21.7137 10.6418 21.6394 10.277 21.4952 9.93663C21.351 9.59624 21.1396 9.28696 20.8731 9.02643C20.6066 8.76591 20.2902 8.55926 19.942 8.41826C19.5938 8.27727 19.2206 8.2047 18.8437 8.2047C18.4669 8.2047 18.0937 8.27727 17.7455 8.41826C17.3973 8.55926 17.0809 8.76591 16.8144 9.02643L9.508 16.1702C8.66042 17.0194 8.18932 18.161 8.19679 19.3474C8.20427 20.5339 8.68971 21.6696 9.54792 22.5086C10.4061 23.3476 11.568 23.8221 12.7816 23.8294C13.9953 23.8367 15.163 23.3762 16.0317 22.5476L23.1274 15.6099L24 16.463L16.9031 23.3995C15.8002 24.4389 14.324 25.0135 12.7921 24.9998C11.2602 24.986 9.79508 24.3849 8.7119 23.3259C7.62873 22.2668 7.01409 20.8345 7.00024 19.3369C6.98639 17.8394 7.57443 16.3964 8.63784 15.3183L15.9442 8.17338V8.17458Z"
                      fill="#B695F8"
                    />
                  </svg>
                </div>
              </div>
              {selectedImages && selectedImages.length > 0 && (
                <div>
                  <div className="mt-1">
                    <label>Selected Images</label>
                  </div>
                  {/* <div className="flex flex-wrap  items-center gap-2">
                    {imagesView}
                  </div> */}
                  <div>
                    {selectedImages.length > 0 && (
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedImages.map((image, index) => (
                            <div className="my-3 thumbnail-wrapper relative ">
                              <div className="absolute right-1 top-1">
                                <div
                                  onClick={() =>
                                    handleFileRemove(index, "image")
                                  }
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

                  {/* {imagesList.length > 0 && (
                    <div>
                      <div>
                        {imagesList.map((image, index) => (
                          <div className="my-3 uploading-img-wrapper relative ">
                            <div className="absolute right-2 top-2">
                              <div
                                onClick={() => {}}
                                className="cursor-pointer"
                              >
                                {" "}
                                <BgTimes />{" "}
                              </div>
                            </div>
                            <div>
                              <img
                                src={image}
                                alt="alt"
                                className="image-style cursor-pointer"
                                onClick={() => {
                                  setImageZoom(true);
                                }}
                              />
                              {imageZoom && (
                                <ZoomImage
                                  src={image}
                                  alt="snow"
                                  onClose={() => setImageZoom(false)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              )}
              {pdfList?.length > 0 && (
                <div>
                  <div className="mt-1">
                    <label>Selected Pdf</label>
                  </div>
                  <div className="flex items-center flex-wrap gap-3">
                    {pdfList?.map((item, index) => {
                      return (
                        <div className=" add-ann-pdf mt-2 relative mb-2  ">
                          <div className="absolute right-1 top-1">
                            <div
                              onClick={() => handleFileRemove(index, "pdf")}
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
                </div>
              )}

              {data?.attachments?.length > 0 && (
                <div>
                  <div className="mt-1">
                    <label>Uploaded files</label>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {" "}
                    {data?.attachments?.length > 0 &&
                      data?.attachments?.map((file, index) => (
                        <button
                          key={index}
                          className="files-btn flex gap-2 items-center mt-2"
                        >
                          {file.file_type.slice(0, 7)}
                          <span
                            className={`cursor-pointer ${
                              delLoader && deleteId === file.news_file_id
                                ? "animate-spin"
                                : ""
                            }`}
                            onClick={() => deleteFile(file?.news_file_id)}
                          >
                            <WhiteBgTimes />
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* <div>
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
                accept="image"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              </div>
            </div> */}

              {/* <div className="mt-1">
              <label>Upload Document</label>
            </div> */}

              {/* <div>
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

                <div> {selectedFile && <span>{selectedFile}</span>} </div>
              <input
                id="file-input-pdf"
                type="file"
                accept="application/pdf"
                onChange={handleSelectPdf}
                style={{ display: "none" }}
              />
              </div>
            </div> */}
            </div>

            <div className="my-5 flex justify-center items-center gap-3">
              <button
                onClick={updateNews}
                className="add-btn text-white px-5 md:px-20 py-2 cursor-pointer  rounded-lg"
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleFileDelete}
      />
    </>
  );
};
