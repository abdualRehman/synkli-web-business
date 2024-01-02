import React from "react";

export const AddFileModal = ({
  toggleModal,
  setImagesList,
  imagesList,
  selectedImages,
  setPdfList,
  pdfList,
  setSelectedImages,
}) => {
  const handleImagesSelect = (e) => {
    const files = e.target.files;

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

    setImagesList(files);
    toggleModal();
  };
  const handlePdfSelect = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const filesToAdd = newFiles.filter(
        (file) =>
          !pdfList.some((selectedFile) => selectedFile.name === file.name)
      );

      if (filesToAdd.length > 0) {
        setPdfList([...pdfList, ...filesToAdd]);
      }
    }
    toggleModal();
  };
  return (
    <div className="sort-modal border-radius rounded-md">
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImagesSelect}
        style={{ display: "none" }}
      />

      <input
        id="file-input-pdf"
        type="file"
        accept="application/pdf"
        multiple
        onChange={handlePdfSelect}
        style={{ display: "none" }}
      />
      <div className="sort-txt p-1">
        <label
          style={{ width: "100%", height: "100%" }}
          className="cursor-pointer"
          htmlFor="file-input"
        >
          Image
        </label>
      </div>

      <div className="sort-txt p-1">
        <label
          style={{ width: "100%", height: "100%" }}
          className="cursor-pointer"
          htmlFor="file-input-pdf"
        >
          File
        </label>
      </div>
    </div>
  );
};
