import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastHandler } from "responseHanlder";
import { setLoader } from "store/global/globalReducer";
import { archiveNewsThunk } from "store/workspace/workspaceNews";
import ConfirmationModal from "utills/confirmationModal";
import { BUSINESS_ID, ERROR_TYPE_ERROR, PERMISSIONS_MESSAGE } from "utills/globalVars";
import { formateDate } from "utills/moment";
import { generateId } from "utills/uid";
import { EyeIcon } from "../../../utills/svgs/EyeIcon";
import { LinkIcon } from "../../../utills/svgs/LinkIcon";
import { TrashIcon } from "../../../utills/svgs/TrashIcon";
import { ANnSkeleton } from "./ann-skeleton/AnnSkeleton";
import NoAnnouncement from "./no-announcement/NoAnnouncement";
import ReadMoreReact from "read-more-react";
import TruncateText from "global-components/StringSlicer";
const AnnouncementList = ({
  toggleAnnDetails,
  handleAnn,
  toggleAnnUpdate,
  filterDate,
  data,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [idTodelete, setidTodelete] = useState("");
  const { isLoading, sideLoader } = useSelector((state) => state.global);
  const handleDelete = () => {
    if (
      (allPermissions?.Announcements?.write || !loginData?.is_employee) &&
      idTodelete
    ) {
      const delPayload = {
        news_id: idTodelete,
        business_id,
      };

      dispatch(setLoader(true));
      dispatch(archiveNewsThunk(delPayload))
        .then((response) => {
          if (response.payload) {
            toggleAnnUpdate();
            setIsConfirmationOpen(false);
            setidTodelete("");
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
        "You don't have permission to access this page",
        ERROR_TYPE_ERROR
      );
    }
  };
  const archiveNews = (news_id) => {
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

  return (
    <div className=" mx-5  mb-5 mt-5 text-black">
      {isLoading ? (
        <ANnSkeleton />
      ) : (
        <div>
          {data && data.length <= 0 ? (
            <NoAnnouncement />
          ) : (
            <div className="ann-list">
              <div className="ann-title">Latest Announcements</div>
              {data?.map((ann, index) => (
                <div
                  className={`md:grid  gap-2 mt-2 p-2 relative announcement ${
                    !(
                      ann.attachments.length > 0 &&
                      ann.attachments[0].file_type === "news_images"
                    )
                      ? "grid-cols-14"
                      : "grid-cols-12"
                  }`}
                >
                  {ann.attachments.length > 0 &&
                    ann.attachments[0].file_type === "news_images" && (
                      <div
                        className="col-span-2 md:p-2 md:pt-3"
                        onClick={() =>
                          navigate(`/announcement/details/${ann?.news_id}`)
                        }
                      >
                        <div>
                          <div className="ann-img-wrapper">
                            <img
                              src={ann?.attachments[0].name}
                              alt="announcementImg"
                              className="ann-img"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="col-span-10  p-3">
                    <div className="">
                      <div></div>{" "}
                      <div className="break-words">
                        <div className="ann-title"> {ann?.title} </div>
                        <div className="ann-desc">
                          <TruncateText
                            index={index}
                            text={ann?.description}
                            maxLength={400}
                          />

                          {/* {ann?.description} */}
                        </div>
                        <div>
                          {" "}
                          <div className=" flex flex-col gap-1 items-end ann-info  justify-end">
                            <div className="">
                              {formateDate(ann?.created_at)}
                            </div>
                            <div className="ann-by">
                              By{" "}
                              <span className="ann-auther">
                                {ann?.created_by}
                              </span>
                            </div>
                          </div>{" "}
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="absolute ann-action top-2 right-5">
                    <div className="flex justify-between flex-col ">
                      {" "}
                      <div className="flex justify-end h-full items-center gap-2">
                        {" "}
                        <div
                          onClick={() =>
                            navigate(`/announcement/details/${ann?.news_id}`)
                          }
                          className="cursor-pointer"
                        >
                          <EyeIcon />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => archiveNews(ann?.news_id)}
                        >
                          <TrashIcon />
                        </div>{" "}
                      </div>{" "}
                    </div>
                  </div>
                </div>
                // <div
                //   className="ann shadow mt-2 p-3 cursor-pointer"
                //   key={generateId()}
                // >
                //   <div className="md:grid grid-cols-10">
                //     <div
                //       className=" col-span-8 flex gap-3"
                //       // onClick={() =>
                //       //   navigate(`/announcement/details/${ann?.news_id}`)
                //       // }
                //     >
                //       <div>
                //         {ann.attachments.length > 0 &&
                //         ann.attachments[0].file_type === "news_images" ? (
                //           <div className="ann-img-wrapper">
                //             <img
                //               src={ann?.attachments[0].name}
                //               alt="announcementImg"
                //               className="ann-img"
                //             />
                //           </div>
                //         ) : (
                //           ""
                //         )}
                //       </div>
                //       <div className="flex flex-col justify-center  ">
                //         <div className="ann-subtitle">{ann.title}</div>
                //         <div className="ann-desc break-words ">
                //           {ann?.description}
                //           {/* <ReadMoreReact
                //             text={ann.description.trim()}
                //             min={150}
                //             ideal={200}
                //             max={250}
                //             readMoreText="Read more"
                //           /> */}
                //         </div>

                //         {ann.attachments.length > 1 && (
                //           <div className="ann-btns  mt-2 flex gap-2 flex-wrap">
                //             {ann?.attachments?.map((att, index) => (
                //               <div>
                //                 <div>
                //                   <button className="flex px-3 py-1  items-center gap-1">
                //                     {" "}
                //                     <span>
                //                       <LinkIcon />
                //                     </span>{" "}
                //                     <span>
                //                       <a href={att.name}>{att.file_type}</a>
                //                     </span>{" "}
                //                   </button>
                //                 </div>
                //               </div>
                //             ))}
                //           </div>
                //         )}
                //       </div>
                //     </div>
                //     <div className="col-span-2 flex flex-col justify-between gap-5  relative">
                //       <div className=" flex gap-2 items-center justify-end mb-2">
                //         <div
                //           onClick={() =>
                //             navigate(`/announcement/details/${ann?.news_id}`)
                //           }
                //           className="cursor-pointer"
                //         >
                //           <EyeIcon />
                //         </div>
                //         <div
                //           className="cursor-pointer"
                //           onClick={() => archiveNews(ann?.news_id)}
                //         >
                //           <TrashIcon />
                //         </div>
                //       </div>

                //       <div className=" flex flex-col gap-1 items-end justify-end">
                //         <div className="">{formateDate(ann?.created_at)}</div>
                //         <div className="ann-by">
                //           By{" "}
                //           <span className="ann-auther">{ann?.created_by}</span>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AnnouncementList;
