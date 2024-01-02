import { motion } from "framer-motion";
import { BgDeleteIcon } from "../../../../../utills/svgs/BgDeleteIcon";
const EditQuestionForm = ({ toggleEditQuestionForm }) => {
  return (
    <div className="add-p-side grid grid-cols-6 ">
      <div className="md:col-span-3 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-3">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleEditQuestionForm}
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
              <div className="flex gap-2 items-center">
                <div>
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 17 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.4379 30.4223C15.6884 31.1926 14.4732 31.1926 13.7237 30.4223L0.562118 16.8948C-0.187375 16.1245 -0.187375 14.8755 0.562118 14.1052L13.7237 0.577745C14.4732 -0.192579 15.6884 -0.192579 16.4379 0.577745C17.1874 1.34807 17.1874 2.59702 16.4379 3.36734L4.63334 15.5L16.4379 27.6327C17.1874 28.403 17.1874 29.6519 16.4379 30.4223Z"
                      fill="#666666"
                    />
                  </svg>
                </div>
                <div className="title">Edit Question Form</div>
              </div>

              <div className="jumbo-dir mt-2">
                Add Service{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Edit Question Form
                </span>
              </div>
            </div>
          </div>

          <div className="booking-question-form ">
            <div className="mx-5 mt-2">
              <div className="add-ann-form">
                <div>
                  <label>Name</label>
                </div>
                <div>
                  <input type="text" name="" id="" />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center mt-5 mx-5 ">
              <button className="add-new-question-btn">Add New Question</button>
            </div>

            <div className="questions-table mx-5 mt-3">
              <div className="question-col question-col-large"> Question </div>
              <div className="question-col flex justify-center">IsRequired</div>
              <div className="question-col flex justify-center">IsActive</div>
              <div className="question-col flex justify-end">Action </div>
            </div>
            <div className="team-line mt-2 mx-5"></div>

            <div className="questions-table mx-5 mt-2">
              <div className="question-col question-col-large">
                {" "}
                Please share anything{" "}
              </div>
              <div className="question-col">No</div>
              <div className="question-col">Yes</div>
              <div className="flex gap-1 justify-start">
                <div>
                  <svg
                    width="26"
                    height="22"
                    viewBox="0 0 36 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.1"
                      width="36"
                      height="30"
                      rx="15"
                      fill="#B695F8"
                    />
                    <path
                      d="M11.875 25C11.3594 25 10.9181 24.8043 10.5512 24.413C10.1837 24.021 10 23.55 10 23V7C10 6.45 10.1837 5.979 10.5512 5.587C10.9181 5.19567 11.3594 5 11.875 5H19.375L25 11V15H23.125V12H18.4375V7H11.875V23H17.5V25H11.875ZM23.4062 17.525L24.4141 18.6L20.7812 22.45V23.5H21.7656L25.3984 19.65L26.3828 20.7L22.3516 25H19.375V21.825L23.4062 17.525ZM26.3828 20.7L23.4062 17.525L24.7656 16.075C24.9375 15.8917 25.1562 15.8 25.4219 15.8C25.6875 15.8 25.9062 15.8917 26.0781 16.075L27.7422 17.85C27.9141 18.0333 28 18.2667 28 18.55C28 18.8333 27.9141 19.0667 27.7422 19.25L26.3828 20.7Z"
                      fill="#B695F8"
                    />
                  </svg>
                </div>
                <div>
                  <BgDeleteIcon />
                </div>
              </div>
            </div>
            <div className="team-line mt-2 mx-5"></div>

            <div className="booking-pagination ml-5">
              <div className="  pagination ">
                <div className="recently-added">
                  Showing 6 to 10 of 26 entries
                </div>
                <div className="pagination-btns">
                  <button>Previous</button>
                  <button className="btn-1-pag">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button className="next-btn">Next</button>
                </div>
              </div>
              <div className="flex justify-center items-center mt-3">
                <button className="service-save-btn">Save</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditQuestionForm;
