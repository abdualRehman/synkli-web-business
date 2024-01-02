import { motion } from "framer-motion";
import pdfIcon from "../../../../files/pdfIcon.svg";
import { useState } from "react";
import { LinkIcon } from "../../../../utills/svgs/LinkIcon";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  USER_TYPE,
} from "utills/globalVars";
import { setSideLoader } from "store/global/globalReducer";
import {
  addThreadThunk,
  uploadThreadFilesThunk,
} from "store/workspace/workspaceThreads";
import { toastHandler } from "responseHanlder";
import { PhotoIcon } from "utills/svgs/PhotoIcon";
import { FileIcon } from "utills/svgs/FileIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import { generateId } from "utills/uid";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { SideTimes } from "utills/svgs/SideTimes";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";

const MyNewThread = ({ toggleMyNewThread, toggleThreadUpdate }) => {
  const [showDescModal, setShowDescModal] = useState(false);
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const { sideLoader } = useSelector((state) => state.global);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleDescModal = () => {
    setShowDescModal(!showDescModal);
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

      const myFiles = [...files, ...e.target.files];
      // newFiles.push(file);
      setFiles(myFiles);
      setShowDescModal(!showDescModal);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files;
    if (file.length >= 4) {
      toastHandler("You can not add more than 4 files", ERROR_TYPE_ERROR);
      return;
    }

    const updatedImages = [...selectedPdf];

    for (let i = 0; i < file.length; i++) {
      const file = file[i];

      const reader = new FileReader();

      reader.onloadend = () => {
        // Add the selected image data URL to the array
        updatedImages.push(reader.result);

        // Set the array of selected images in the state
        setSelectedPdf([...updatedImages]);
      };

      reader.readAsDataURL(file);
    }
    const newFiles = [...files, ...file];
    // newFiles.push(file);
    setFiles(newFiles);
    setShowDescModal(!showDescModal);
  };
  const handleImageSelect = (e) => {
    if (files.length >= 4) {
      toastHandler("You can not add more than 4 files", ERROR_TYPE_ERROR);
      return;
    }

    const updatedImages = [...selectedImages];

    const MyFiles = e.target.files;
    for (let i = 0; i < MyFiles.length; i++) {
      const file = MyFiles[i];

      const reader = new FileReader();

      reader.onloadend = () => {
        // Add the selected image data URL to the array
        updatedImages.push(reader.result);

        // Set the array of selected images in the state
        setSelectedImages([...updatedImages]);
      };

      reader.readAsDataURL(file);
    }

    const file = e.target.files;
    const newFiles = [...files, ...file];
    // newFiles.push(file);
    setFiles(newFiles);
    setShowDescModal(!showDescModal);
  };

  const addNewThread = () => {
    if (files.length > 4) {
      toastHandler("You can not add more than 4 files", ERROR_TYPE_ERROR);
      return;
    }

    if (!files || !title || !description) {
      toastHandler("Please fill in required fields", ERROR_TYPE_ERROR);
      return;
    }
    const payload = {
      business_id,
      title,
      description,
    };

    const formData = new FormData();
    formData.append("business_id", business_id);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("uploaded_by", USER_TYPE);
    files.forEach((file, index) => {
      formData.append("thread_files", file);
    });

    dispatch(setSideLoader(true));
    dispatch(addThreadThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleThreadUpdate();
          toggleMyNewThread();
          toastHandler("Thread added successfully", ERROR_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  const deleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFileRemoveImg = (index) => {
    const newSelected = [...selectedImages];
    const newPdfs = [...selectedPdf];
    const newFiles = [...files];
    newPdfs.splice(index, 1);

    setSelectedPdf(newPdfs);
    newFiles.splice(index, 1);
    newSelected.splice(index, 1);
    setSelectedImages(newSelected);
    setFiles(newFiles);
  };
  return (
    <div className="add-p-side grid grid-cols-5 ">
      <div className="md:col-span-3 hidden md:block left-side"></div>
      <div className="right-side col-span-5 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleMyNewThread}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Create New Thread</div>

              <div className="jumbo-dir mt-2">
                Workspace
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Create New Thread
                </span>
              </div>
            </div>
          </div>

          <div className="px-5 ">
            <div className="add-ann-form">
              <div>
                <label>Title</label>
              </div>
              <div>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                  maxLength={40}
                />
              </div>
            </div>

            <div className="mt-1 add-ann-form">
              <label>Description</label>
            </div>

            <div className="thread-dec-wraper  overflow-hidden thread-description-wrapper">
              {/* <div className="desc-selected-docs flex gap-2 items-center">
                {files && files.length > 0
                  ? files.slice(0, 2)?.map((file, index) => (
                      <button
                        className="flex gap-1 p-1 items-center"
                        key={generateId()}
                      >
                        {" "}
                        <span>
                          <LinkIcon />
                        </span>{" "}
                        <span>{file?.name.slice(0, 10)}</span>{" "}
                        <span
                          className="cursor-default"
                          onClick={() => handleFileRemoveImg(index)}
                        >
                          {" "}
                          <BgTimes />
                        </span>{" "}
                      </button>
                    ))
                  : ""}
                {files.length > 2 && <span>{files.length - 2} more</span>}
              </div> */}
              {showDescModal && (
                <div className="description-modal py-2 shadow">
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf, .doc, .docx"
                    onChange={handleSelectPdf}
                    style={{ display: "none" }}
                    multiple
                  />
                  <input
                    id="image-input"
                    type="file"
                    multiple
                    accept="image/jpeg, image/png"
                    onChange={handleImageSelect}
                    style={{ display: "none" }}
                  />

                  <label htmlFor="image-input">
                    <div className="flex gap-1 description-modal-section items-center">
                      <div>
                        <PhotoIcon />
                      </div>
                      <div>Photo</div>
                    </div>{" "}
                  </label>
                  <label htmlFor="file-input">
                    <div className="flex gap-1 description-modal-section  items-center mt-2">
                      <div>
                        <FileIcon />
                      </div>
                      <div>File</div>
                    </div>
                  </label>
                </div>
              )}
              <textarea
                className="description-area"
                id=""
                cols="30"
                rows="10"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div
                onClick={toggleDescModal}
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
          </div>
          <div>
            <div className="mx-5 flex items-center flex-wrap gap-3">
              {selectedImages?.map((image, index) => (
                <div className="my-3 thumbnail-wrapper relative ">
                  <div className="absolute right-1 top-1">
                    <div
                      onClick={() => handleFileRemoveImg(index)}
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
                    <label>{files[index]?.name?.slice(0, 7)}</label>{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {" "}
            <div className="">
              {selectedPdf.length > 0 && (
                <div>
                  {console.log(selectedPdf, "selectedPdf")}
                  <div className="mx-5 flex items-center flex-wrap gap-3">
                    {selectedPdf.map((image, index) => (
                      <div className=" add-ann-pdf mt-2 relative mb-2  ">
                        <div className="absolute right-1 top-1">
                          <div
                            onClick={() => handleFileRemoveImg(index)}
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
                            {image?.name.slice(0, 8)}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              onClick={addNewThread}
              className="add-btn text-white px-5 flex gap-2 md:px-12 py-2 cursor-pointer  rounded-lg"
            >
              Create Thread {sideLoader && <SmallLoaderWhite />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default MyNewThread;
