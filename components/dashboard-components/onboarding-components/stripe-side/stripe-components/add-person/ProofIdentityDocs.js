import { useState, useRef } from "react";
import { ImagePlaceholder } from "../../../../../../utills/svgs/ImagePlaceholder";
import { CloudIcon } from "../../../../../../utills/svgs/CloudIcon";
import { Times } from "../../../../../../utills/svgs/Times";
const ProofIdentityDocs = ({ handleCondition }) => {
  const [firstCheck, setFirstCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);

  function goBack() {
    handleCondition(9);
  }

  function goForward() {
    handleCondition(8);
  }

  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState("");
  const inputRef = useRef(null);

  function onFileSelect(file) {
    console.log(file);

    const truncatedFileName = file.name.slice(0, 20);

    const fileExtension = file.name.slice(file.name.lastIndexOf("."));
    const reader = new FileReader();

    reader.onload = () => {
      setFile(reader.result);
    };

    reader.readAsDataURL(file);
    setFileName(truncatedFileName + fileExtension);
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <div className="p-5 pt-10">
        <div className="upper-upload">
          {file === null ? (
            <div>
              {" "}
              <div
                className="file-input mt-5 relative"
                onClick={handleButtonClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="file-input__icon mt-5 ml-5">
                  <CloudIcon />
                </div>
                <div className="m-5">
                  <p className="file-input__text font-bold">
                    Select a file or drag and drop here{" "}
                  </p>
                  <p>JPG, PNG or PDF, file size no more than 10 MB</p>
                </div>

                <p className="absolute bottom-2 right-3 file-text">
                  Select File
                </p>

                <input
                  ref={inputRef}
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif, .pdf" // Specify the file types you want to allow
                  className="file-input__input"
                  onChange={handleFileSelect}
                />
              </div>
              <div className="proof-text mt-3">
                Please make sure the document you’re about to upload meets the
                requirements below. If it does, please confirm by checking:
              </div>
              <div>
                <div className="proof-checklistitems">
                  <div className="flex gap-2 mt-3">
                    <div className="mt-1 ">
                      <input
                        onChange={(e) => setFirstCheck(e.target.checked)}
                        checked={firstCheck}
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
                        checked={secondCheck}
                        type="checkbox"
                      />
                    </div>
                    <div>The uploaded document is color.</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-10">
              <div>
                <div className="up-container flex gap-3 px-2 py-1 mx-2">
                  <div className="flex justify-center items-center">
                    <ImagePlaceholder />
                  </div>
                  <div>{filename}</div>

                  <div
                    onClick={() => setFile(null)}
                    className="flex justify-center cursor-pointer items-center"
                  >
                    <Times />
                  </div>
                </div>

                <div className="proof-text mt-3 px-2">
                  Please make sure the document you’re about to upload meets the
                  requirements below. If it does, please confirm by checking:
                </div>

                <div>
                  <div className="proof-checklistitems ml-2 mt-2">
                    <div className="flex gap-2 mt-3">
                      <div className="mt-1">
                        <input
                          onChange={(e) => setFirstCheck(e.target.checked)}
                          checked={firstCheck}
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
                          onClick={(e) => setSecondCheck(e.target.checked)}
                          checked={secondCheck}
                          type="checkbox"
                        />
                      </div>
                      <div>The uploaded document is color.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {file && (
                  <div className="uploaded-img">
                    {" "}
                    <img src={file} alt="file" />{" "}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lower-upload flex justify-center items-center gap-2">
          <button onClick={goBack} className="cancel-btn px-10 py-2 rounded-md">
            Back
          </button>
          <buttonn
            onClick={() => goForward()}
            className={` ${
              firstCheck && secondCheck && file
                ? "add-btn cursor-pointer text-white px-5 py-2 rounded-md"
                : "blocked-btn   text-white px-5 py-2 rounded-md"
            }`}
            disabled={!firstCheck || !secondCheck || !file}
          >
            {" "}
            Submit Document
          </buttonn>
        </div>
      </div>
    </div>
  );
};

export default ProofIdentityDocs;
