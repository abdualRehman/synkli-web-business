import { useEffect, useState } from "react";
import { EyeIcon } from "../../../utills/svgs/EyeIcon";
import { BgDeleteIcon } from "../../../utills/svgs/BgDeleteIcon";
import { LgTimes } from "../../../utills/svgs/LgTimes";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  deleteBusinessPhotoThunk,
  getWorkspacephotosThunk,
  uploadBusinessPhotoThunk,
} from "store/auth/slices";
import {
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  PERMISSIONS_MESSAGE,
  USER_TYPE,
} from "utills/globalVars";
import { generateId } from "utills/uid";
import { toastHandler } from "responseHanlder";
import { SmallLoader } from "components/common/SmallLoader";
import { TrashIcon } from "utills/svgs/TrashIcon";
const WorkSpacePhotos = () => {
  const dispatch = useDispatch();

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [imageInView, setImageInView] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState(null);
  const [photosLoader, setPhotosLoader] = useState(false);
  const { data } = useSelector((state) => state.getWorkspacephotos);
  const [imagesUpdated, setImagesUpdated] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [delLoad, setDelLoad] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const imageHandler = (index) => {
    const findImage = data[index];
    setImageInView(findImage);
  };
  const handleImageUpload = (event) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      const file = event.target.files[0];
      setImage(file);
      const formData = new FormData();
      formData.append("uploaded_by", USER_TYPE);
      formData.append("business_images", file);
      setImageUploading(true);
      dispatch(uploadBusinessPhotoThunk(formData))
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            toastHandler("Image uploaded", ERROR_TYPE_SUCCESS);
            setImagesUpdated(!imagesUpdated);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("");
          setImageUploading(false);
        });
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  const deletePhoto = (business_photo_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      setDelLoad(true);
      setDeleteId(business_photo_id);
      console.log(business_photo_id);
      dispatch(deleteBusinessPhotoThunk({ business_photo_id }))
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            setImageInView(null);
            setImagesUpdated(!imagesUpdated);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setDelLoad(false);
        });
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  useEffect(() => {
    setPhotosLoader(true);
    dispatch(getWorkspacephotosThunk())
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setPhotosLoader(false);
      });
  }, [dispatch, imagesUpdated]);

  const [imgId, setImgId] = useState("");
  const [showImgActions, setShowImgActions] = useState(false);

  const handleImgActions = (business_photo_id) => {
    setImgId(business_photo_id);
    setShowImgActions(true);
  };

  const hideImgActions = () => {
    setShowImgActions(false);
  };
  return (
    <div className="md:px-10 px-5 mt-2">
      <div className="grid md:grid-cols-2 b  ">
        <div>
          <div className="flex gap-2 items-center flex-wrap py-2">
            {" "}
            <div className="add-image overflow-hidden flex justify-center items-center ">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="image-input-file"
                disabled={imageUploading ? true : false}
              />
              <label htmlFor="image-input-file" className="cursor-pointer">
                {imageUploading ? <SmallLoader /> : <LgTimes />}
              </label>
            </div>
            {data &&
              data?.map((im, index) => (
                <div
                  onMouseEnter={() => handleImgActions(im?.business_photo_id)}
                  onMouseLeave={hideImgActions}
                  key={generateId()}
                  className={`image-container relative ${
                    delLoad && deleteId === im.business_photo_id
                      ? "animate-pulse"
                      : ""
                  } `}
                >
                  {showImgActions && imgId === im?.business_photo_id ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, type: "tween" }}
                      className="image-actions-container"
                    >
                      <div
                        className="cursor-pointer"
                        onClick={() => imageHandler(index)}
                      >
                        <EyeIcon />
                      </div>
                      <div
                        onClick={() => deletePhoto(im?.business_photo_id)}
                        className="cursor-pointer"
                      >
                        <BgDeleteIcon />
                      </div>
                    </motion.div>
                  ) : (
                    ""
                  )}
                  <img src={im.url} alt="img" className=" galery-image" />
                </div>
              ))}
          </div>
        </div>
        <div>
          {" "}
          <div className="p-2 in-view">
            <div className="in-view-container">
              {imageInView && (
                <img
                  src={imageInView?.url}
                  alt="inview"
                  className="view-image"
                />
              )}
            </div>
          </div>{" "}
        </div>
        {/* <div className="flex gap-2 items-center flex-wrap  p-2 images-list ">
        
          <div className="add-image overflow-hidden flex justify-center items-center ">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-input-file"
              disabled={imageUploading ? true : false}
            />
            <label htmlFor="image-input-file" className="cursor-pointer">
              {imageUploading ? <SmallLoader /> : <LgTimes />}
            </label>
          </div>

          {data &&
            data?.map((im, index) => (
              <div
                onClick={() => imageHandler(index)}
                key={generateId()}
                className={`image-container relative ${
                  delLoad && deleteId === im.business_photo_id
                    ? "animate-pulse"
                    : ""
                } `}
              >
                <img src={im.url} alt="img" className=" galery-image" />

                <div className="icons-container">
                  <span className="icon bg-gray-800 rounded-full">
                    <EyeIcon />
                  </span>
                  <div
                    onClick={() => deletePhoto("something")}
                    className="icon bg-gray-800 p-1 rounded-full z-50"
                  >
                    <TrashIcon />
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="p-5 in-view">
          <div className="in-view-container">
            {imageInView && (
              <img src={imageInView?.url} alt="inview" className="view-image" />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default WorkSpacePhotos;
