import React, { useState } from "react";
import { AttachmentIcon } from "utills/svgs/AttachmentIcon";

export const TaskFileEditor = ({ file }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className="add-ann-form p-3 border border-gray-500 border-dotted rounded-md mt-2">
      <input
        id="file-input"
        type="file"
        accept="images/*"
        multiple
        onChange={(e) => handleFilesChange(e)}
        style={{ display: "none" }}
      />
      <div className="flex gap-2 items-center">
        {" "}
        <div className="dim-text">This file will be replaced</div>
        <label>{file.name.slice(0, 10)}</label>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-2">
          {selectedFile && (
            <button className="files-btn flex gap-2 items-center ">
              {selectedFile.name.slice(0, 6)}
            </button>
          )}
          <label htmlFor="file-input" className="cursor-pointer">
            <AttachmentIcon />
          </label>
        </div>

        <div className="flex justify-center items-center">
          <button className="edit-file-btn font-xm rounded-md p-2">
            Replace
          </button>
        </div>
      </div>
    </div>
  );
};
