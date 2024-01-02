import React, { useEffect, useState } from "react";
import { BgTimes } from "utills/svgs/BgTimes";
import { motion } from "framer-motion";
import { ArrowBack, ArrowLeft } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";
export const Attachments = ({ toggleAttachments }) => {
  const { form } = useSelector((state) => state.global);
  const [showModal, setShowModal] = useState(false);
  const [noAttachments, setNoAttchments] = useState(false);

  useEffect(() => {
    let hasAttachement;
    if (form) {
      form?.steps?.forEach((step) => {
        step.fields?.forEach((field) => {
          if (field?.type === "file") {
            if (field?.default_value) {
              setNoAttchments(false);

              hasAttachement = false;
            }
          } else {
            setNoAttchments(true);
            hasAttachement = true;
          }
        });
      });
    }
    setNoAttchments(hasAttachement);
  }, []);
  return (
    <div>
      {" "}
      <div className="add-p-side grid grid-cols-5 text-black">
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
                onClick={toggleAttachments}
                className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
              >
                <BgTimes />
              </div>

              <div className="add-detail pt-10 px-5">
                <div className="title"> Attachments</div>
              </div>
            </div>

            {form?.steps?.map((step, stepIndex) => (
              <div>
                {step?.fields?.map((field, fieldIndex) => (
                  <div className="m-5">
                    {field?.type === "file" ? (
                      <div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            {field?.default_value?.map((val, valindex) => (
                              <div className="my-3 thumbnail-wrapper relative ">
                                <div>
                                  <img
                                    src={val?.url}
                                    alt="alt"
                                    className="thumbnail-image cursor-pointer"
                                    onClick={() => {
                                      setShowModal(true);
                                    }}
                                  />
                                  {showModal && (
                                    <ZoomImage
                                      src={val?.url}
                                      alt="snow"
                                      onClose={() => setShowModal(false)}
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            ))}

            {!noAttachments && (
              <div className="flex justify-center items-center add-ann-form h-48">
                {" "}
                <label> No Attachments Found</label>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
