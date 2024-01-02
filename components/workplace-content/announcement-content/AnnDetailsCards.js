import React, { useState } from "react";
import "./css/announcement.css";

import { AnnDetailSkeleton } from "./ann-skeleton/AnnDetailSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { formateDate, formateDateAndTime } from "utills/moment";
import { LatestAnnSkeleton } from "./ann-skeleton/LatestAnnSkeleton";
import { useNavigate } from "react-router-dom";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  PERMISSIONS_MESSAGE,
} from "utills/globalVars";
import Cookies from "js-cookie";
import { setLoader } from "store/global/globalReducer";
import { archiveNewsThunk } from "store/workspace/workspaceNews";
import { toastHandler } from "responseHanlder";
import { LinkIcon } from "utills/svgs/LinkIcon";
import ConfirmationModal from "utills/confirmationModal";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
export const AnnDetailsCards = ({ toggleEditAnn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idTodelete, setidTodelete] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { isLoading, sideLoader } = useSelector((state) => state.global);
  const { data } = useSelector((state) => state.getSingleNews);
  const { data: latestNews } = useSelector((state) => state.getAllNews);

  const business_id = localStorage.getItem(BUSINESS_ID);
  const [isZoomed, setIsZoomed] = useState(false);

  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const parsedArray = latestNews?.map((obj) => ({
    ...obj,
    created_at: new Date(obj.created_at),
  }));

  const sortedArr = parsedArray
    ?.sort((a, b) => b.created_at - a.created_at)
    .reverse();
  const latestAnn = sortedArr?.slice(0, 4);

  const handleDeleteNews = () => {
    if (
      (allPermissions?.Announcements?.write || !loginData?.is_employee) &&
      idTodelete
    ) {
      const payload = {
        business_id,
        news_id: idTodelete,
      };

      dispatch(setLoader(true));
      dispatch(archiveNewsThunk(payload))
        .then((response) => {
          if (response.payload) {
            setIsConfirmationOpen(false);
            setidTodelete("");
            navigate("/announcement");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          dispatch(setLoader(false));
        });
    } else {
      toastHandler(
        "You don't have permission to do this action",
        ERROR_TYPE_ERROR
      );
    }
  };
  const deleteNews = (news_id) => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Announcements?.admin ||
      allPermissions?.Announcements?.write
    ) {
      setidTodelete(news_id);
      setIsConfirmationOpen(true);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };
  const handleEdit = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Announcements?.admin ||
      allPermissions?.Announcements?.write
    ) {
      toggleEditAnn();
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };
  return (
    <div>
      <div className="md:mx-10 mx-5 text-black">
        <div className="grid md:grid-cols-10 gap-5">
          {isLoading ? (
            <div className="col-span-6 ann-detail-card bg-white shadow p-2 rounded-md">
              <AnnDetailSkeleton />
            </div>
          ) : (
            <div className="col-span-6 ">
              <div className=" bg-white shadow p-2 rounded-md">
                {" "}
                {data && (
                  <div>
                    {data?.attachments?.length > 0 &&
                    data?.attachments[0]?.file_type === "news_images" ? (
                      <div className="ann-detail-img-container">
                        <img
                          src={data.attachments[0].name}
                          alt="profile"
                          className="ann-detail-image"
                          onClick={() => setIsZoomed(true)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="detail-heading ann-detail-title my-2">
                      {data?.title}
                    </div>
                    <div className="ann-detail-text">{data?.description}</div>
                    {data.attachments.length > 0 && (
                      <div className="ann-btns  mt-2 flex gap-2 flex-wrap">
                        {data?.attachments?.map((att, index) => (
                          <div>
                            <div>
                              <button className="flex px-3 py-1  items-center gap-1">
                                {" "}
                                <span>
                                  <LinkIcon />
                                </span>{" "}
                                <span>
                                  <a href={att.name}>{att.file_type}</a>
                                </span>{" "}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="ann-info flex justify-end mt-3 flex-col items-end">
                      <div className="ann-dates">
                        {formateDate(data?.created_at)}
                      </div>
                      <div className="ann-by">
                        By{" "}
                        <span className="ann-auther">{data?.created_by}</span>
                      </div>
                    </div>
                    {isZoomed && (
                      <ZoomImage
                        src={data.attachments[0].name}
                        alt="Profile"
                        onClose={() => setIsZoomed(false)}
                      />
                    )}
                  </div>
                )}{" "}
              </div>
              <div className="mt-5">
                <div className="md:col-span-6 col-span-10">
                  <div className="flex justify-center items-center gap-10">
                    <div
                      className="remove-ann-btn px-12 py-1 cursor-pointer"
                      onClick={() => deleteNews(data?.news_id)}
                    >
                      Remove
                    </div>
                    <div
                      className="edit-ann-btn px-16 py-1 cursor-pointer"
                      onClick={handleEdit}
                    >
                      Edit
                    </div>
                  </div>
                </div>
                <div className="col-span-4"></div>
              </div>
            </div>
          )}

          <div className="col-span-4  ">
            <div className="ann-detail-card shadow bg-white p-2 rounded-md">
              {" "}
              <div className="latest-announcement-title my-2">
                Latest Announcements
              </div>
              {isLoading ? (
                <LatestAnnSkeleton />
              ) : (
                <div>
                  {latestAnn &&
                    latestAnn?.map((ann, index) => (
                      <div
                        className={`ann  p-3 cursor-pointer shadow ${
                          index > 0 && "mt-2"
                        }`}
                        onClick={() =>
                          navigate(`/announcement/details/${ann?.news_id}`)
                        }
                      >
                        <div>
                          <div className=" col-span-8 flex gap-3">
                            {/* <div>
                            
                            {ann?.attachments.length > 0 ? (
                              <div className="latest-ann-img-wrapper">
                                <img
                                  src={ann?.attachments[0].name}
                                  alt="announcementImg"
                                  className="ann-img"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </div> */}
                            <div>
                              {ann?.attachments.length > 0 &&
                                ann.attachments.find(
                                  (attachment) =>
                                    attachment.file_type === "news_images"
                                ) && (
                                  <div className="latest-ann-img-wrapper">
                                    <img
                                      src={
                                        ann.attachments.find(
                                          (attachment) =>
                                            attachment.file_type ===
                                            "news_images"
                                        ).name
                                      }
                                      alt="announcementImg"
                                      className="ann-img"
                                    />
                                  </div>
                                )}
                            </div>

                            <div className="">
                              <div className="ann-detail-title">
                                {ann?.title}
                              </div>
                              <div className="ann-detail-text w-full">
                                {ann?.description.slice(0, 60)} ...
                              </div>

                              {ann.attachments.length > 1 && (
                                <div className="ann-btns  mt-2 flex gap-2 flex-wrap">
                                  {ann?.attachments?.map((att, index) => (
                                    <div>
                                      <div>
                                        <button className="flex px-3 py-1  items-center gap-1">
                                          {" "}
                                          <span>
                                            <LinkIcon />
                                          </span>{" "}
                                          <span>
                                            <a href={att.name}>
                                              {att.file_type}
                                            </a>
                                          </span>{" "}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDeleteNews}
      />
    </div>
  );
};
