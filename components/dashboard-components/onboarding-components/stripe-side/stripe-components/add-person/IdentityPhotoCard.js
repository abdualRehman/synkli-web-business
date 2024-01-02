import { useState, useRef } from "react";

const IdentityPhotoCard = ({ handleCondition }) => {
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");
  const inputRef = useRef(null);

  const [secondFile, setSecondFile] = useState(null);
  const [secondFilename, setSecondFilename] = useState("");
  const secondinputRef = useRef(null);

  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  function onFileSelect(file) {
    console.log(file);
  }

  const onSecondFileSelect = (file) => {
    console.log(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  const handleSecondFileSelect = (e) => {
    const file = e.target.files[0];
    onSecondFileSelect(file);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleSecondButtonClick = () => {
    secondinputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSecondDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onFileSelect(file);
  };

  const handleSecondDrop = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    onSecondFileSelect(file);
  };

  function goBack() {
    handleCondition(9);
  }

  function goForward() {
    handleCondition(8);
  }

  return (
    <div className="p-5">
      <div>
        <div className="p-5 ">
          <div className="upper-upload">
            <div className="upload-front pb-1">Upload Front</div>
            <div>
              {" "}
              <div
                className="file-input p-d-upload relative"
                onClick={handleButtonClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="file-input__icon mt-5 ml-5">
                  <svg
                    width="41"
                    height="26"
                    viewBox="0 0 41 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M33.0068 10.7471C33.0068 10.9198 33.1295 11.0587 33.302 11.0665C37.1299 11.2388 40.1875 14.4055 40.1875 18.2787C40.1875 22.2568 36.9795 25.507 33.0068 25.507H24V25.5156H17.6875H17H8.67871C4.33691 25.5156 0.8125 21.9795 0.8125 17.6287C0.8125 14.8494 2.24878 12.406 4.42783 11.0049L4.42784 11.0049C5.12813 10.5546 5.47828 10.3295 5.58448 10.2379C5.69378 10.1437 5.71343 10.133 5.72824 10.1176C5.74304 10.1022 5.753 10.0822 5.84292 9.96931C5.93029 9.85964 6.2198 9.36862 6.79881 8.38658L6.79881 8.38657C7.71102 6.83941 9.39511 5.79822 11.3154 5.79822C12.3672 5.79822 12.8931 5.79822 12.9814 5.79038C13.4186 5.75156 13.5797 5.75949 13.7081 5.69847C13.8364 5.63746 13.9319 5.5075 14.238 5.19289C14.2998 5.12937 14.5245 4.85323 14.974 4.30095C16.8341 2.01525 19.6603 0.554688 22.8379 0.554688C28.4541 0.554688 33.0068 5.11353 33.0068 10.7471ZM17.6875 22.6206H23.3125V18.5734H25.6544C26.2502 18.5734 26.5481 18.5734 26.688 18.4549C26.8094 18.3521 26.8746 18.1976 26.8637 18.0389C26.851 17.8561 26.6433 17.6426 26.2279 17.2155L22.795 13.6869C21.9939 12.8634 21.5934 12.4516 21.129 12.298C20.7207 12.163 20.2798 12.1631 19.8716 12.2984C19.4073 12.4523 19.007 12.8643 18.2064 13.6882L14.7702 17.2245C14.3553 17.6515 14.1479 17.865 14.1353 18.0478C14.1245 18.2065 14.1897 18.3609 14.3111 18.4636C14.4509 18.582 14.7486 18.582 15.344 18.582H17.6875V22.6206Z"
                      fill="url(#paint0_linear_2369_7166)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2369_7166"
                        x1="22.432"
                        y1="0.864678"
                        x2="22.4201"
                        y2="25.5157"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#101828" />
                        <stop offset="0.998509" stop-color="#0D1B37" />
                        <stop offset="1" stop-color="#0A1E46" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="m-5">
                  <p className="file-input__text font-bold">
                    Select a file or drag and drop here{" "}
                  </p>
                  <p> JPG, PNG or PDF, file size no more than 10 MB </p>
                </div>

                <p className="absolute bottom-2 right-3 file-text">
                  Select File
                </p>

                <input
                  ref={inputRef}
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif, .pdf" // Specify the file types you want to allow
                  className="file-input__input"
                  onChange={handleSecondFileSelect}
                />
              </div>
              <div>
                <div className="upload-front pb-1 mt-2">Upload Back</div>

                <div
                  className="file-input p-d-upload relative"
                  onClick={handleSecondButtonClick}
                  onDragOver={handleSecondDragOver}
                  onDrop={handleSecondDrop}
                >
                  <div className="file-input__icon mt-5 ml-5">
                    <svg
                      width="41"
                      height="26"
                      viewBox="0 0 41 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M33.0068 10.7471C33.0068 10.9198 33.1295 11.0587 33.302 11.0665C37.1299 11.2388 40.1875 14.4055 40.1875 18.2787C40.1875 22.2568 36.9795 25.507 33.0068 25.507H24V25.5156H17.6875H17H8.67871C4.33691 25.5156 0.8125 21.9795 0.8125 17.6287C0.8125 14.8494 2.24878 12.406 4.42783 11.0049L4.42784 11.0049C5.12813 10.5546 5.47828 10.3295 5.58448 10.2379C5.69378 10.1437 5.71343 10.133 5.72824 10.1176C5.74304 10.1022 5.753 10.0822 5.84292 9.96931C5.93029 9.85964 6.2198 9.36862 6.79881 8.38658L6.79881 8.38657C7.71102 6.83941 9.39511 5.79822 11.3154 5.79822C12.3672 5.79822 12.8931 5.79822 12.9814 5.79038C13.4186 5.75156 13.5797 5.75949 13.7081 5.69847C13.8364 5.63746 13.9319 5.5075 14.238 5.19289C14.2998 5.12937 14.5245 4.85323 14.974 4.30095C16.8341 2.01525 19.6603 0.554688 22.8379 0.554688C28.4541 0.554688 33.0068 5.11353 33.0068 10.7471ZM17.6875 22.6206H23.3125V18.5734H25.6544C26.2502 18.5734 26.5481 18.5734 26.688 18.4549C26.8094 18.3521 26.8746 18.1976 26.8637 18.0389C26.851 17.8561 26.6433 17.6426 26.2279 17.2155L22.795 13.6869C21.9939 12.8634 21.5934 12.4516 21.129 12.298C20.7207 12.163 20.2798 12.1631 19.8716 12.2984C19.4073 12.4523 19.007 12.8643 18.2064 13.6882L14.7702 17.2245C14.3553 17.6515 14.1479 17.865 14.1353 18.0478C14.1245 18.2065 14.1897 18.3609 14.3111 18.4636C14.4509 18.582 14.7486 18.582 15.344 18.582H17.6875V22.6206Z"
                        fill="url(#paint0_linear_2369_7166)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_2369_7166"
                          x1="22.432"
                          y1="0.864678"
                          x2="22.4201"
                          y2="25.5157"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#101828" />
                          <stop offset="0.998509" stop-color="#0D1B37" />
                          <stop offset="1" stop-color="#0A1E46" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="m-5">
                    <p className="file-input__text font-bold p-d-text">
                      Select a file or drag and drop here{" "}
                    </p>
                    <p> JPG, PNG or PDF, file size no more than 10 MB </p>
                  </div>

                  <p className="absolute bottom-2 right-3 file-text">
                    Select File
                  </p>

                  <input
                    ref={secondinputRef}
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif, .pdf" // Specify the file types you want to allow
                    className="file-input__input"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
              <div className="proof-text p-d-text mt-5">
                Please make sure the document you’re about to upload meets the
                requirements below. If it does, please confirm by checking:
              </div>
              <div>
                <div className="proof-checklistitems p-d-text">
                  <div className="flex gap-2 mt-3">
                    <div className="flex justify-center items-center">
                      <input
                        onChange={(e) => setFirstCheck(e.target.checked)}
                        type="checkbox"
                      />
                    </div>
                    <div>
                      The document shows your business name and relevant
                      business information.
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <div className="flex justify-center items-center">
                      <input
                        onChange={(e) => setSecondCheck(e.target.checked)}
                        type="checkbox"
                      />
                    </div>
                    <div>The uploaded document is color.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lower-upload flex justify-center items-center gap-2">
            <button
              onClick={goBack}
              className="cancel-btn px-10 py-2 rounded-md"
            >
              Back
            </button>
            <buttonn
              onClick={goForward}
              className={` ${
                firstCheck && secondCheck
                  ? "add-btn cursor-pointer text-white px-5 py-2 rounded-md"
                  : "blocked-btn   text-white px-5 py-2 rounded-md"
              }`}
              disabled={!firstCheck || !secondCheck}
            >
              {" "}
              Submit Document
            </buttonn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityPhotoCard;
