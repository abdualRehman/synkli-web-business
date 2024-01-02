import { motion } from "framer-motion";
const BookingQuestionForm = ({ toggleBookingQuestionForm }) => {
  return (
    <div className="add-p-side grid grid-cols-5 ">
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
              onClick={toggleBookingQuestionForm}
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
                <div className="title">Booking Question Form</div>
              </div>

              <div className="jumbo-dir mt-2">
                Add Service{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Booking Question Form
                </span>
              </div>
            </div>
          </div>

          <div className="booking-question-form ">
            <div className="flex justify-end items-center mt-5 mx-5 ">
              <button className="booking-btn">Manage Question Order</button>
            </div>

            <div className="mx-5 mt-2">
              <div className="add-ann-form">
                <div>
                  <label>Booking Question Form</label>
                </div>
                <div>
                  <select>
                    <option value="" selected disabled>
                      Questions
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center mt-5 mx-5 ">
              <button className="add-new-question-btn">Add New Question</button>
            </div>

            <div className="questions-table mx-5 mt-3">
              <div className="question-col question-col-large"> Question </div>
              <div className="question-col">IsRequired</div>
              <div className="question-col">IsActive</div>
            </div>
            <div className="team-line mt-2 mx-5"></div>

            <div className="questions-table mx-5 mt-2">
              <div className="question-col question-col-large">
                {" "}
                Please share anything{" "}
              </div>
              <div className="question-col">No</div>
              <div className="question-col">Yes</div>
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

export default BookingQuestionForm;
