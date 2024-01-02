import React, { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UndoIcon } from "../../../../../utills/svgs/UndoIcon";
import { RedoIcon } from "../../../../../utills/svgs/RedoIcon";
import { TextIcon } from "../../../../../utills/svgs/TextIcon";
import { UrlIcon } from "../../../../../utills/svgs/UrlIcon";
import { SelectImageIcon } from "../../../../../utills/svgs/SelectImageIcon";
import { ListIcon } from "../../../../../utills/svgs/ListIcon";
import { MemoryCardIcon } from "../../../../../utills/svgs/MemoryCardIcon";
import { FontIcon } from "../../../../../utills/svgs/FontIcon";
import { DimmedDeleteIcon } from "../../../../../utills/svgs/DimmedDeleteIcon";
import { TimesIcon } from "../../../../../utills/svgs/TimesIcon";

const Notes = () => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);

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
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        // Customize the URL and method for your image upload endpoint
        const response = await fetch("YOUR_IMAGE_UPLOAD_URL", {
          method: "POST",
          body: formData,
        });

        const imageUrl = await response.json();

        const quillEditor = quillRef.current.getEditor();
        const range = quillEditor.getSelection();
        quillEditor.insertEmbed(range.index, "image", imageUrl);
      }
    };
  };

  console.log(editorContent);

  return (
    <div className="edit-emp-details px-5 py-5">
      <div className="editor-container">
        <div className="editor-tollbar px-10 py-2 flex justify-between">
          <div>
            <button onClick={handleUndo}>
              <UndoIcon />
            </button>
            <button onClick={handleRedo} className="ml-2">
              <RedoIcon />
            </button>
          </div>
          <button onClick={handleBold}>
            <TextIcon />
          </button>
          <button onClick={handleLink}>
            <UrlIcon />
          </button>
          <button onClick={handleImageUpload}>
            <SelectImageIcon />
          </button>
          <button onClick={handleBulletPoints}>
            <ListIcon />
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

      <div className="mt-10 flex gap-2 justify-center items-center">
        <button className="s-btn flex gap-2">
          {" "}
          <span>
            {" "}
            <MemoryCardIcon />
          </span>{" "}
          <span>Save</span>{" "}
        </button>
        <button className="mt-btn flex gap-2">
          {" "}
          <span>
            <FontIcon />
          </span>{" "}
          <span>Manual Text</span>{" "}
        </button>{" "}
        <br />
      </div>

      <div className="mt-2 mb-5 flex gap-2 justify-center items-center">
        <button className="d-btn flex gap-2">
          {" "}
          <span>
            {" "}
            <DimmedDeleteIcon />
          </span>{" "}
          <span>Delete</span>{" "}
        </button>
        <button className="d-btn flex gap-2">
          {" "}
          <span>
            <TimesIcon />
          </span>{" "}
          <span>Cancel</span>{" "}
        </button>{" "}
        <br />
      </div>
    </div>
  );
};
export default Notes;
