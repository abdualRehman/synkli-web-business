import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { motion } from "framer-motion";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
import Cookies from "js-cookie";

import React, { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { toastHandler } from "responseHanlder";
import {
  createNoteThunk,
  uploadNoteFileThunk,
} from "store/workspace/workspaceNotes";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  USER_TYPE,
} from "utills/globalVars";
import { BgTimes } from "utills/svgs/BgTimes";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { SideTimes } from "utills/svgs/SideTimes";

const AddNote = ({ toggleAddNote, toggleNotesUpdate }) => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [noteLoader, setNoteLoader] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const handleUndo = () => {
    const quillEditor = quillRef.current.getEditor();
    quillEditor.history.undo();
  };

  const handleRedo = () => {
    const quillEditor = quillRef.current.getEditor();
    quillEditor.history.redo();
  };

  const handleBold = () => {
    const quillEditor = quillRef.current.getEditor();
    const range = quillEditor.getSelection();
    if (range) {
      const format = quillEditor.getFormat(range);
      quillEditor.format("bold", !format.bold);
    }
  };

  const handleBulletPoints = () => {
    const quillEditor = quillRef.current.getEditor();
    const range = quillEditor.getSelection();
    if (range) {
      const format = quillEditor.getFormat(range);
      quillEditor.format("list", !format.list);
    }
  };

  const handleLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      const quillEditor = quillRef.current.getEditor();
      const range = quillEditor.getSelection();
      if (range) {
        quillEditor.format("link", url);
      }
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple");
    input.click();

    input.onchange = async () => {
      const files = input.files; // Use input.files to get all selected files

      if (files.length > 0) {
        setFiles(files);

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
      console.log(files[0], "files");
    };
  };

  console.log(editorContent);

  const handleSubmit = () => {
    if (!title || !editorContent) {
      toastHandler("Please fill in all required fields", ERROR_TYPE_ERROR);
      return;
    }

    const formData = new FormData();
    formData.append("business_id", business_id);
    formData.append("title", title.trim());
    formData.append("description", editorContent.trim());
    formData.append("uploaded_by", USER_TYPE);

    for (let i = 0; i < files.length; i++) {
      formData.append("note_files", files[i]);
    }
    console.log(files, "files");
    setNoteLoader(true);

    dispatch(createNoteThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleNotesUpdate();
          toggleAddNote();

          toastHandler("Note added successfully", ERROR_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setNoteLoader(false);
      });
  };

  const handleFileRemove = (index) => {
    const newArr = [...files];
    const newSelected = [...selectedImages];
    newSelected.splice(index, 1);
    setSelectedImages(newSelected);
    newArr.splice(index, 1);
    setFiles(newArr);
  };

  const items = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      items.push(
        <button className="flex items-center gap-1 selected-file ">
          <LinkIcon />
          <span>{files[i]?.name?.slice(0, 10)}</span>
          <span
            onClick={() => handleFileRemove(files[i])}
            className="cursor-pointer"
          >
            <BgTimes />
          </span>{" "}
        </button>
      );
    }
  }
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
              onClick={toggleAddNote}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add Note</div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; Notes{" "}
                <span className="special-jumbo-text"> &gt; Add Note</span>
              </div>
            </div>
          </div>

          <div className="add-ann-form px-5 mt-3 ">
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

            <div className=" mt-3">
              <label>Description</label>
            </div>
          </div>

          <div className="px-5">
            <div className="editor-container">
              <div className="editor-tollbar px-10 py-2 flex justify-between">
                <div>
                  <button onClick={handleUndo}>
                    <svg
                      width="24"
                      height="9"
                      viewBox="0 0 30 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.77001 6.12428C9.01101 4.07499 12.2921 2.13053 15.7391 2.00631C17.6584 1.93714 19.6572 2.42875 21.6158 3.82088C23.587 5.22191 25.5635 7.56884 27.3549 11.2796C27.595 11.777 28.1928 11.9855 28.6902 11.7454C29.1876 11.5053 29.3961 10.9075 29.156 10.4101C27.2623 6.48744 25.0931 3.83866 22.7745 2.19071C20.4435 0.533856 18.0086 -0.0767743 15.6671 0.00760667C11.5523 0.155887 7.81662 2.43883 5.35476 4.70903L0.860925 0.215201C0.546062 -0.0996624 0.00768256 0.123121 0.00737173 0.568405L1.24487e-07 11.1289C-0.000192824 11.4053 0.223933 11.6294 0.500348 11.6292L11.0608 11.6218C11.5061 11.6215 11.7289 11.0832 11.414 10.7683L6.77001 6.12428Z"
                        fill="#454545"
                      />
                    </svg>
                  </button>
                  <button onClick={handleRedo} className="ml-2">
                    <svg
                      width="24"
                      height="9"
                      viewBox="0 0 30 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22.7437 6.12428C20.5027 4.07499 17.2216 2.13053 13.7746 2.00631C11.8553 1.93714 9.85644 2.42875 7.89783 3.82088C5.92668 5.22191 3.95018 7.56884 2.15878 11.2796C1.91868 11.777 1.32084 11.9855 0.823483 11.7454C0.32612 11.5053 0.117575 10.9075 0.357679 10.4101C2.25138 6.48744 4.42061 3.83866 6.73915 2.19071C9.07021 0.533856 11.505 -0.0767743 13.8466 0.00760667C17.9614 0.155887 21.6971 2.43883 24.1589 4.70903L28.6527 0.215201C28.9676 -0.0996624 29.506 0.123121 29.5063 0.568405L29.5137 11.1289C29.5139 11.4053 29.2897 11.6294 29.0133 11.6292L18.4529 11.6218C18.0076 11.6215 17.7848 11.0832 18.0997 10.7683L22.7437 6.12428Z"
                        fill="#454545"
                      />
                    </svg>
                  </button>
                </div>
                <button onClick={handleBold}>
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 21 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.3441 0H0.511719V18.9701H20.3441V0ZM6.40706 16.3845L7.46939 13.4442H13.2363L14.2986 16.3845H16.1197L11.3583 3.23828H9.3664L4.58594 16.3845H6.40706ZM10.3528 5.36293L12.7431 12.0404H7.96261L10.3528 5.36293Z"
                      fill="#666666"
                    />
                  </svg>
                </button>
                <button onClick={handleLink}>
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 22 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.07951 0.67861C9.07951 0.498631 9.00801 0.326024 8.88075 0.19876C8.75349 0.0714963 8.58088 0 8.4009 0H5.68646L5.38787 0.00814337C3.98012 0.0913451 2.65999 0.719064 1.7069 1.75844C0.753807 2.79781 0.242554 4.16726 0.281354 5.57693C0.320154 6.9866 0.905962 8.32586 1.91478 9.31123C2.92361 10.2966 4.27627 10.8508 5.68646 10.8564H8.4009L8.52305 10.8455C8.68992 10.8153 8.83942 10.7237 8.94213 10.5888C9.04484 10.4539 9.09331 10.2854 9.07798 10.1165C9.06266 9.94758 8.98466 9.79055 8.85934 9.6763C8.73403 9.56205 8.57048 9.49886 8.4009 9.49918H5.68646L5.41773 9.49103C4.36518 9.41904 3.38165 8.94131 2.67438 8.15848C1.9671 7.37565 1.59129 6.34886 1.62613 5.29442C1.66097 4.23998 2.10373 3.24023 2.86113 2.50579C3.61854 1.77135 4.63145 1.35958 5.68646 1.35722H8.4009L8.52305 1.34636C8.67928 1.31777 8.82054 1.23529 8.92222 1.11327C9.0239 0.991255 9.07956 0.837439 9.07951 0.67861ZM21.969 5.42888C21.969 3.98905 21.3971 2.60819 20.3789 1.59008C19.3608 0.571969 17.98 0 16.5401 0H13.8257L13.7049 0.0108576C13.538 0.0410697 13.3885 0.132663 13.2858 0.267601C13.1831 0.402538 13.1347 0.571041 13.15 0.739927C13.1653 0.908812 13.2433 1.06584 13.3686 1.18009C13.4939 1.29434 13.6575 1.35753 13.8271 1.35722H16.5415L16.8089 1.36536C17.8712 1.4353 18.864 1.91857 19.5743 2.71162C20.2846 3.50467 20.6561 4.5444 20.6091 5.60803C21.0692 5.75325 21.5076 5.98669 21.8984 6.307C21.9446 6.02198 21.969 5.72746 21.969 5.42888V5.42888ZM16.5401 4.75027H5.68646L5.56431 4.76112C5.399 4.79289 5.25139 4.88496 5.15016 5.01946C5.04893 5.15395 5.0013 5.32127 5.01653 5.48892C5.03175 5.65657 5.10874 5.81257 5.23255 5.92663C5.35635 6.04069 5.51813 6.10467 5.68646 6.10613H16.5429L16.665 6.09527C16.8303 6.06351 16.9779 5.97144 17.0792 5.83694C17.1804 5.70244 17.228 5.53512 17.2128 5.36747C17.1976 5.19983 17.1206 5.04382 16.9968 4.92976C16.873 4.8157 16.7112 4.75173 16.5429 4.75027H16.5401ZM11.0841 14.0825L17.6395 7.52849C18.1168 7.05871 18.7604 6.79661 19.4301 6.79933C20.0998 6.80205 20.7413 7.06937 21.2148 7.54302C21.6883 8.01666 21.9553 8.65826 21.9578 9.32797C21.9603 9.99767 21.6979 10.6412 21.228 11.1183L14.674 17.671C14.2921 18.0531 13.8136 18.3242 13.2896 18.4555L11.2565 18.9644C11.0543 19.0146 10.8425 19.0117 10.6418 18.9558C10.4411 18.9 10.2582 18.7932 10.111 18.6458C9.9637 18.4984 9.85708 18.3155 9.80143 18.1147C9.74579 17.9139 9.74303 17.7021 9.79341 17.5L10.301 15.4682C10.4327 14.943 10.7027 14.4639 11.0855 14.0825H11.0841Z"
                      fill="#666666"
                    />
                  </svg>
                </button>
                <button onClick={handleImageUpload}>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.96875"
                      y="0.65625"
                      width="18.1078"
                      height="18.1078"
                      rx="3"
                      fill="#666666"
                    />
                    <path
                      d="M7.43594 11.434L4.41797 14.8831H16.4898L12.6096 10.1406L9.16049 14.0209L7.43594 11.434Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button onClick={handleBulletPoints}>
                  <svg
                    width="19"
                    height="15"
                    viewBox="0 0 23 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.50781 1.42105C5.50781 1.16979 5.60439 0.928828 5.7763 0.751162C5.94821 0.573496 6.18137 0.473684 6.42448 0.473684H21.0911C21.3343 0.473684 21.5674 0.573496 21.7393 0.751162C21.9112 0.928828 22.0078 1.16979 22.0078 1.42105C22.0078 1.67231 21.9112 1.91328 21.7393 2.09094C21.5674 2.26861 21.3343 2.36842 21.0911 2.36842H6.42448C6.18137 2.36842 5.94821 2.26861 5.7763 2.09094C5.60439 1.91328 5.50781 1.67231 5.50781 1.42105ZM21.0911 8.05263H6.42448C6.18137 8.05263 5.94821 8.15244 5.7763 8.33011C5.60439 8.50778 5.50781 8.74874 5.50781 9C5.50781 9.25126 5.60439 9.49223 5.7763 9.66989C5.94821 9.84756 6.18137 9.94737 6.42448 9.94737H21.0911C21.3343 9.94737 21.5674 9.84756 21.7393 9.66989C21.9112 9.49223 22.0078 9.25126 22.0078 9C22.0078 8.74874 21.9112 8.50778 21.7393 8.33011C21.5674 8.15244 21.3343 8.05263 21.0911 8.05263ZM21.0911 15.6316H6.42448C6.18137 15.6316 5.94821 15.7314 5.7763 15.9091C5.60439 16.0867 5.50781 16.3277 5.50781 16.5789C5.50781 16.8302 5.60439 17.0712 5.7763 17.2488C5.94821 17.4265 6.18137 17.5263 6.42448 17.5263H21.0911C21.3343 17.5263 21.5674 17.4265 21.7393 17.2488C21.9112 17.0712 22.0078 16.8302 22.0078 16.5789C22.0078 16.3277 21.9112 16.0867 21.7393 15.9091C21.5674 15.7314 21.3343 15.6316 21.0911 15.6316ZM1.38281 0C1.11086 0 0.845022 0.0833434 0.618904 0.239491C0.392787 0.395638 0.216549 0.617576 0.112479 0.877239C0.00840827 1.1369 -0.0188213 1.42263 0.0342334 1.69829C0.087288 1.97394 0.218244 2.22715 0.410541 2.42589C0.602838 2.62463 0.84784 2.75997 1.11456 2.8148C1.38129 2.86963 1.65775 2.84149 1.909 2.73393C2.16025 2.62638 2.375 2.44424 2.52608 2.21055C2.67717 1.97686 2.75781 1.70211 2.75781 1.42105C2.75781 1.04417 2.61295 0.682716 2.35509 0.416217C2.09722 0.149717 1.74749 0 1.38281 0ZM1.38281 7.57895C1.11086 7.57895 0.845022 7.66229 0.618904 7.81844C0.392787 7.97459 0.216549 8.19652 0.112479 8.45619C0.00840827 8.71585 -0.0188213 9.00158 0.0342334 9.27723C0.087288 9.55289 0.218244 9.8061 0.410541 10.0048C0.602838 10.2036 0.84784 10.3389 1.11456 10.3937C1.38129 10.4486 1.65775 10.4204 1.909 10.3129C2.16025 10.2053 2.375 10.0232 2.52608 9.78949C2.67717 9.5558 2.75781 9.28106 2.75781 9C2.75781 8.62311 2.61295 8.26166 2.35509 7.99516C2.09722 7.72866 1.74749 7.57895 1.38281 7.57895ZM1.38281 15.1579C1.11086 15.1579 0.845022 15.2412 0.618904 15.3974C0.392787 15.5535 0.216549 15.7755 0.112479 16.0351C0.00840827 16.2948 -0.0188213 16.5805 0.0342334 16.8562C0.087288 17.1318 0.218244 17.385 0.410541 17.5838C0.602838 17.7825 0.84784 17.9179 1.11456 17.9727C1.38129 18.0275 1.65775 17.9994 1.909 17.8918C2.16025 17.7843 2.375 17.6021 2.52608 17.3684C2.67717 17.1348 2.75781 16.86 2.75781 16.5789C2.75781 16.2021 2.61295 15.8406 2.35509 15.5741C2.09722 15.3076 1.74749 15.1579 1.38281 15.1579Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
              <ReactQuill
                ref={quillRef}
                value={editorContent}
                onChange={setEditorContent}
                modules={{
                  toolbar: false,
                }}
                placeholder="What is on your mind?"
              />
            </div>
          </div>

          <div className="mx-5">
            {selectedImages.length > 0 && (
              <div>
                <div className="flex items-center flex-wrap gap-3">
                  {selectedImages.map((image, index) => (
                    <div className="my-3 thumbnail-wrapper relative ">
                      <div className="absolute right-1 top-1">
                        <div
                          onClick={() => handleFileRemove(index)}
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
            )}
          </div>

          <div className="flex justify-center items-center my-5">
            <button
              disabled={noteLoader ? true : false}
              onClick={handleSubmit}
              className="add-btn text-white px-5 md:px-12 py-2 cursor-pointer flex gap-2 rounded-lg"
            >
              Add {noteLoader && <SmallLoaderWhite />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddNote;
