import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BUSINESS_ID, ERROR_TYPE_ERROR, USER_TYPE } from "utills/globalVars";
import { setSideLoader } from "store/global/globalReducer";
import { createDeductionThunk } from "store/workspace/workspaceDeduction";
import Cookies from "js-cookie";
import { toastHandler } from "responseHanlder";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import pdfIcon from "../../../files/pdfIcon.svg";

const AddDeduction = ({ toggleAddDeduction, toggleDeduction }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { sideLoader } = useSelector((state) => state.global);

  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectPdf = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setSelectedFile(file);
  };

  const addDeduction = () => {
    if (!title || !selectedFile) {
      toastHandler("Please fill in all required fields", ERROR_TYPE_ERROR);
      return;
    }

    const formData = new FormData();
    formData.append("business_id", business_id);
    formData.append("title", title.trim());
    formData.append("uploaded_by", USER_TYPE);
    formData.append("deduction_file", selectedFile);
    dispatch(setSideLoader(true));
    dispatch(createDeductionThunk(formData))
      .then((response) => {
        if (response.payload) {
          toggleDeduction();
          toggleAddDeduction();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  return (
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
              onClick={toggleAddDeduction}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#666666" />
                <path
                  d="M19 8L8 19"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M19 19L8 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add Deduction</div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; Deduction{" "}
                <span className="special-jumbo-text"> &gt; Add Deduction</span>
              </div>
            </div>
          </div>

          <div>
            <div className=" mt-3 p-5">
              <div className="add-ann-form">
                <div>
                  <div>
                    <label>Title</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      maxLength="50"
                      placeholder="Title"
                      className="px-3 add-d-input rounded-xl mt-1"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="service-form mt-2">
                <label> Upload pdf</label>
              </div>

              <div>
                <div>
                  <div className="d-upload-deduction  mt-2 ">
                    <label
                      htmlFor="file-input-pdf"
                      className="upload-app-label"
                    >
                      <div className="add-app-camera flex justify-center">
                        <svg
                          width="25"
                          height="28"
                          viewBox="0 0 30 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.00467 18.0531C7.79839 18.0531 7.60056 18.1348 7.45469 18.2801C7.30883 18.4254 7.22689 18.6226 7.22689 18.8281V23.4781C7.22689 23.6836 7.30883 23.8808 7.45469 24.0261C7.60056 24.1714 7.79839 24.2531 8.00467 24.2531C8.21095 24.2531 8.40878 24.1714 8.55464 24.0261C8.7005 23.8808 8.78244 23.6836 8.78244 23.4781V22.7031H9.55556C10.1744 22.7031 10.7679 22.4581 11.2055 22.0221C11.6431 21.5861 11.8889 20.9947 11.8889 20.3781C11.8889 19.7615 11.6431 19.1701 11.2055 18.7341C10.7679 18.2981 10.1744 18.0531 9.55556 18.0531H8.00467ZM9.55556 21.1531H8.78244V19.6031H9.55556C9.76184 19.6031 9.95967 19.6848 10.1055 19.8301C10.2514 19.9754 10.3333 20.1726 10.3333 20.3781C10.3333 20.5836 10.2514 20.7808 10.1055 20.9261C9.95967 21.0714 9.76184 21.1531 9.55556 21.1531ZM19.6636 18.8281C19.6636 18.6226 19.7455 18.4254 19.8914 18.2801C20.0372 18.1348 20.2351 18.0531 20.4413 18.0531H22.7824C22.9887 18.0531 23.1866 18.1348 23.3324 18.2801C23.4783 18.4254 23.5602 18.6226 23.5602 18.8281C23.5602 19.0336 23.4783 19.2308 23.3324 19.3761C23.1866 19.5214 22.9887 19.6031 22.7824 19.6031H21.2176L21.216 21.1562H22.7824C22.9887 21.1562 23.1866 21.2379 23.3324 21.3832C23.4783 21.5285 23.5602 21.7257 23.5602 21.9312C23.5602 22.1367 23.4783 22.3339 23.3324 22.4792C23.1866 22.6245 22.9887 22.7062 22.7824 22.7062H21.216L21.2191 23.4765C21.2193 23.5783 21.1994 23.6791 21.1605 23.7732C21.1216 23.8674 21.0645 23.9529 20.9924 24.025C20.8468 24.1706 20.6492 24.2527 20.4429 24.2531C20.2366 24.2535 20.0386 24.1723 19.8925 24.0272C19.7463 23.8822 19.664 23.6852 19.6636 23.4797L19.6589 21.9327V21.9296L19.6636 18.8281ZM14.2222 18.0531C14.0159 18.0531 13.8181 18.1348 13.6722 18.2801C13.5264 18.4254 13.4444 18.6226 13.4444 18.8281V23.4781C13.4444 23.6836 13.5264 23.8808 13.6722 24.0261C13.8181 24.1714 14.0159 24.2531 14.2222 24.2531H14.9969C15.822 24.2531 16.6133 23.9265 17.1968 23.3451C17.7802 22.7638 18.108 21.9753 18.108 21.1531C18.108 20.3309 17.7802 19.5424 17.1968 18.9611C16.6133 18.3797 15.822 18.0531 14.9969 18.0531H14.2222ZM15 22.7031V19.6031C15.4126 19.6031 15.8082 19.7664 16.0999 20.0571C16.3917 20.3478 16.5556 20.742 16.5556 21.1531C16.5556 21.5642 16.3917 21.9584 16.0999 22.2491C15.8082 22.5398 15.4126 22.7031 15 22.7031ZM27.4444 28.9V27.0958C28.3638 26.6602 29 25.7256 29 24.6437V17.6625C29 16.5806 28.3638 15.6475 27.4444 15.2104V13.1334C27.4443 12.3113 27.1164 11.5229 26.5329 10.9417L17.4656 1.9083C17.4415 1.88602 17.4161 1.86531 17.3893 1.8463C17.3701 1.8315 17.3514 1.81599 17.3333 1.7998C17.2263 1.69916 17.1125 1.60594 16.9927 1.5208C16.9528 1.4952 16.9113 1.47241 16.8682 1.4526L16.7936 1.4154L16.7158 1.37045C16.6318 1.3224 16.5462 1.2728 16.4576 1.2356C16.1478 1.11232 15.8199 1.04007 15.4869 1.0217C15.4561 1.0197 15.4255 1.01608 15.3951 1.01085C15.3529 1.00435 15.3103 1.00073 15.2676 1H5.66667C4.84155 1 4.05023 1.32661 3.46678 1.90797C2.88333 2.48933 2.55556 3.27783 2.55556 4.1V15.2104C1.63622 15.646 1 16.5806 1 17.6625V24.6437C1 25.7256 1.63622 26.6587 2.55556 27.0958V28.9C2.55556 29.7222 2.88333 30.5107 3.46678 31.092C4.05023 31.6734 4.84155 32 5.66667 32H24.3333C25.1585 32 25.9498 31.6734 26.5332 31.092C27.1167 30.5107 27.4444 29.7222 27.4444 28.9ZM24.3333 29.675H5.66667C5.46039 29.675 5.26256 29.5933 5.11669 29.448C4.97083 29.3027 4.88889 29.1055 4.88889 28.9V27.3562H25.1111V28.9C25.1111 29.1055 25.0292 29.3027 24.8833 29.448C24.7374 29.5933 24.5396 29.675 24.3333 29.675ZM25.1111 13.4V14.95H4.88889V4.1C4.88889 3.89446 4.97083 3.69733 5.11669 3.55199C5.26256 3.40665 5.46039 3.325 5.66667 3.325H15V10.3C15 11.1222 15.3278 11.9107 15.9112 12.492C16.4947 13.0734 17.286 13.4 18.1111 13.4H25.1111ZM23.3658 11.075H18.1111C17.9048 11.075 17.707 10.9933 17.5611 10.848C17.4153 10.7027 17.3333 10.5055 17.3333 10.3V5.06255L23.3658 11.075ZM3.72222 17.275H26.2778C26.3809 17.275 26.4798 17.3158 26.5528 17.3885C26.6257 17.4612 26.6667 17.5597 26.6667 17.6625V24.6437C26.6667 24.7465 26.6257 24.845 26.5528 24.9177C26.4798 24.9904 26.3809 25.0312 26.2778 25.0312H3.72222C3.61908 25.0312 3.52017 24.9904 3.44724 24.9177C3.37431 24.845 3.33333 24.7465 3.33333 24.6437V17.6625C3.33333 17.5597 3.37431 17.4612 3.44724 17.3885C3.52017 17.3158 3.61908 17.275 3.72222 17.275Z"
                            fill="url(#paint0_linear_1343_1739)"
                            stroke="#F8F4FE"
                            stroke-width="0.8"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1343_1739"
                              x1="16.3738"
                              y1="1.38499"
                              x2="16.3481"
                              y2="32.0001"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#101828" />
                              <stop offset="0.998509" stop-color="#0D1B37" />
                              <stop offset="1" stop-color="#0A1E46" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="add-app-camera-text mt-2">
                        Click to upload app file
                      </div>
                    </label>
                  </div>
                  <input
                    id="file-input-pdf"
                    type="file"
                    accept="application/pdf"
                    onChange={handleSelectPdf}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5 grid grid-cols-3 gap-3">
            {selectedFile && (
              <div className=" add-ann-pdf mt-2 relative  ">
                <div className="absolute right-1 top-1">
                  <div
                    onClick={() => setSelectedFile("")}
                    className="cursor-pointer"
                  >
                    {" "}
                    <BgTimes />{" "}
                  </div>
                </div>
                <label className="upload-app-label">
                  <div className="add-app-camera flex justify-center">
                    <img
                      src={pdfIcon}
                      alt="alt"
                      style={{ height: 30, width: 30 }}
                    />
                  </div>
                  <div className="add-app-camera-text mt-2">
                    {selectedFile?.name.slice(0, 8)}
                  </div>
                </label>
              </div>
            )}
          </div>

          <div className="add-service-bottom">
            <button
              onClick={addDeduction}
              className="add-btn px-20 py-2 flex gap-2 cursor-pointer text-white rounded-lg"
            >
              Add
              {sideLoader ? <SmallLoaderWhite /> : ""}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default AddDeduction;
