import { motion } from "framer-motion";
import { useState } from "react";
import { ImageIcon } from "../../../../utills/svgs/ImageIcon";
import { SideTimes } from "utills/svgs/SideTimes";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import { useDispatch, useSelector } from "react-redux";
import {
  handleImage,
  handleProfileUpdating,
  setSideLoader,
} from "store/global/globalReducer";
import {
  addAppThunk,
  uploadAppImageThunk,
} from "store/workspace/workspaceApps";
import { toastHandler } from "responseHanlder";
import {
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  USER_TYPE,
} from "utills/globalVars";
import { SmallLoader } from "components/common/SmallLoader";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import ModalImage from "react-modal-image";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import { ImageCropper } from "global-components/ImageCropper";
import { DataURIToBlob } from "utills/dataValidation";

const AddApp = ({
  toggleShowAddApp,
  toggleAppsUpdated,
  togglePreviewAddImg,
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const sideLoader = useSelector((state) => state.global.sideLoader);
  const { profileUpdating } = useSelector((state) => state.global);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [appLoader, setAppLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [appFile, setAppFile] = useState(null);
  const [showCroper, setShowCroper] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the selected image data URL in the state
        setSelectedImage(reader.result);
        setAppFile(reader.result);
      };

      reader.readAsDataURL(file);
      setShowCroper(true);
    }
  };

  const addApp = (e) => {
    e.preventDefault();
    // if (!name || !link || !selectedFile) {
    //   toastHandler("Please fill in all required fields", ERROR_TYPE_ERROR);
    //   return;
    // }

    if (linkError) {
      toastHandler("invalid link", "error");
      return;
    }

    const formData = new FormData();

    if (appFile) {
      const file = DataURIToBlob(selectedImage);
      formData.append("image", file, "image.jpg");
    }

    formData.append("uploaded_by", USER_TYPE);
    formData.append("name", name.trim());
    formData.append("link", link.trim());
    // formData.append("image", selectedFile);

    setAppLoader(true);
    dispatch(addAppThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler("App added successfully", ERROR_TYPE_SUCCESS);
          toggleAppsUpdated();
          handleProfileUpdating(!profileUpdating);
          toggleShowAddApp();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAppLoader(false);
      });
  };

  const [linkError, setLinkError] = useState(false);
  const handleAppLink = (value) => {
    setLink(value);
    if (!value?.includes(".com")) {
      setLinkError(true);
      return;
    } else {
      setLinkError(false);
      setLink(value);
    }
  };

  const handleSelectedFiles = () => {
    setSelectedFile(null);
    setSelectedImage(null);
  };

  const saveImage = (image) => {
    setSelectedImage(image);
  };

  const croperHeightWidth = 150;

  return (
    <div className="add-p-side grid grid-cols-6 text-black">
      <div className="md:col-span-4 hidden md:block left-side">
        {appFile && showCroper ? (
          <>
            <ImageCropper
              width={croperHeightWidth}
              height={croperHeightWidth}
              setShowCroper={setShowCroper}
              image={appFile}
              handleCroppedImage={(image) => saveImage(image)}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="right-side col-span-6 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleShowAddApp}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title ">Add New App</div>

              <div className="jumbo-dir">
                Workspace &gt; Apps{" "}
                <span className="special-jumbo-text"> &gt; Add New App</span>
              </div>
            </div>
          </div>

          <form onSubmit={addApp}>
            {" "}
            <div>
              <div>
                <div className="add-ann-form mt-5 px-5">
                  <div>
                    <div>
                      <label>App Name</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        maxLength={40}
                        placeholder="App Name"
                        className="px-3 rounded-xl mt-1"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <div>
                      <label>App Link</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        maxLength="50"
                        placeholder="App Link"
                        className={`px-3 rounded-xl mt-1 ${
                          link && linkError ? "add-error-border" : ""
                        }`}
                        onChange={(e) => handleAppLink(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      {linkError && link ? (
                        <span className="error-div">
                          Link must include `.com`{" "}
                        </span>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <div>
                      <label>Upload App Image (optional)</label>
                    </div>

                    <div>
                      <div>
                        <div className=" add-ann-img-form mt-2  ">
                          <label
                            htmlFor="file-input"
                            className="upload-app-label"
                          >
                            <div className="add-app-camera flex justify-center">
                              <ImageIcon />
                            </div>
                            <div className="add-app-camera-text mt-2">
                              Click to upload app image
                            </div>
                          </label>
                        </div>
                        {/* {selectedFile && (
                        <button className="flex items-center gap-1 selected-file">
                          <LinkIcon />
                          <span>{selectedFile.name.slice(0, 10)}</span>
                          <span
                            onClick={handleSelectedFiles}
                            className="cursor-pointer"
                          >
                            <BgTimes />
                          </span>{" "}
                        </button>
                      )} */}
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    {" "}
                    <div className="flex flex-wrap items-center gap-2">
                      {" "}
                      {selectedImage && (
                        <div className="my-3 thumbnail-wrapper relative">
                          <div
                            onClick={handleSelectedFiles}
                            className="absolute right-1 top-1 cursor-pointer"
                          >
                            <BgTimes />
                          </div>{" "}
                          <div>
                            {/* <ModalImage
                          small={selectedImage} // The thumbnail image URL
                          large={selectedImage} // The full-size image URL
                          alt={selectedFile.name}
                        /> */}

                            <img
                              src={selectedImage}
                              alt="alt"
                              className="cursor-pointer thumbnail-image"
                              onClick={() => {
                                setShowModal(true);
                              }}
                            />
                            {showModal && (
                              <ZoomImage
                                src={selectedImage}
                                alt="snow"
                                onClose={() => setShowModal(false)}
                              />
                            )}
                          </div>
                          <div className="add-ann-form text-white flex justify-center items-center">
                            {" "}
                            <label>
                              {selectedFile?.name?.slice(0, 7)}
                            </label>{" "}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <div className="mt-3">
                    {selectedImage && (
                      <div
                        onClick={handleImgPreview}
                        className="uploading-img-wrapper cursor-pointer"
                      >
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="uploading-img"
                        />
                      </div>
                    )}
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center my-5">
              <button
                disabled={appLoader ? true : false}
                type="submit"
                // onClick={addApp}
                className="add-btn px-5 md:px-20 py-2 cursor-pointer text-white rounded-lg"
              >
                {appLoader ? <SmallLoaderWhite /> : "Upload"}
              </button>
            </div>{" "}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddApp;
