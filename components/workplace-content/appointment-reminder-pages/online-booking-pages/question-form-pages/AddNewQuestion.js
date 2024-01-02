import { motion } from "framer-motion";
const AddNewQuestion = ({ toggleAddNewQuestion }) => {
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
              onClick={toggleAddNewQuestion}
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
              <div>
                <div className="title">Add New Question</div>
              </div>

              <div className="jumbo-dir mt-2">
                Add Service &gt; Edit Question Form{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Add New Question
                </span>
              </div>
            </div>
          </div>

          <div className="add-ann-form mx-5 mt-3">
            <div>
              <label>Question</label>
            </div>
            <div className="mt-1">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="ann-text-form"
                placeholder="Write"
              ></textarea>
            </div>

            <div>
              <div className="flex gap-1 items-center">
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
                <div>
                  {" "}
                  <label>Required</label>{" "}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div>
                  <input type="checkbox" name="" id="" />
                </div>
                <div>
                  {" "}
                  <label>Active</label>{" "}
                </div>
              </div>
            </div>
          </div>

          <button className="add-new-question-btn">Save</button>
        </motion.div>
      </div>
    </div>
  );
};
export default AddNewQuestion;
