import { useState } from "react";
import "./css/abnDeduction.css";
import { motion } from "framer-motion";
import { SideTimes } from "../../../../utills/svgs/SideTimes";
import { BgArrowLeft } from "../../../../utills/svgs/BgArrowLeft";
import { BgArrowRight } from "../../../../utills/svgs/BgArrowRight";
const AbnDeduction = ({ toggleAbnDeduction }) => {
  const [rentalDeductions, setRentalDeductions] = useState([
    {
      id: 1,
      description: "Property maintenance",
      expense: 500,
      gst: 50,
      type: "Rental",
    },
    {
      id: 2,
      description: "Advertising fees",
      expense: 200,
      gst: 20,
      type: "Rental",
    },
    {
      id: 3,
      description: "Insurance premium",
      expense: 300,
      gst: 30,
      type: "Rental",
    },
    {
      id: 4,
      description: "Property management fees",
      expense: 400,
      gst: 40,
      type: "Rental",
    },
    { id: 5, description: "Legal fees", expense: 250, gst: 25, type: "Rental" },
    {
      id: 6,
      description: "Council rates",
      expense: 350,
      gst: 35,
      type: "Rental",
    },
    {
      id: 7,
      description: "Repairs and maintenance",
      expense: 450,
      gst: 45,
      type: "Rental",
    },
    {
      id: 8,
      description: "Utilities (electricity, water)",
      expense: 150,
      gst: 15,
      type: "Rental",
    },
    {
      id: 9,
      description: "Cleaning services",
      expense: 200,
      gst: 20,
      type: "Rental",
    },
    {
      id: 10,
      description: "Depreciation expenses",
      expense: 300,
      gst: 30,
      type: "Rental",
    },
    {
      id: 11,
      description: "Other expenses",
      expense: 100,
      gst: 10,
      type: "Rental",
    },
  ]);

  const [deductions, setDeductions] = useState([
    { id: 1, address: "315 Prospect Road", names: "Mr. Raj/Mr. Alpha" },
    { id: 2, address: "123 Main Street", names: "Mr. Beta/Mr. Charlie" },
    { id: 3, address: "789 Elm Avenue", names: "Mr. Delta/Mr. Echo" },
    { id: 4, address: "456 Oak Drive", names: "Mr. Foxtrot/Mr. Golf" },
    { id: 5, address: "987 Pine Lane", names: "Mr. Hotel/Mr. India" },
    { id: 6, address: "654 Maple Court", names: "Mr. Juliet/Mr. Kilo" },
    { id: 7, address: "321 Cedar Crescent", names: "Mr. Lima/Mr. Mike" },
    { id: 8, address: "789 Willow Boulevard", names: "Mr. November/Mr. Oscar" },
  ]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(deductions.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentDeductions = deductions.slice(startIdx, endIdx);

  return (
    <div className="add-p-side grid grid-cols-10 ">
      <div className="col-span-4 block left-side"></div>
      <div className="right-side col-span-6">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleAbnDeduction}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-5 px-5">
              <div className="title">ABN Deduction</div>
            </div>
          </div>

          <div className="forms-buttons mt-3 mx-10 ">
            <div className="carousel-container">
              <div className="grid grid-cols-4 gap-1">
                {currentDeductions.map((deduction, index) => (
                  <div
                    key={index}
                    className=" py-2 cursor-pointer rental-carousal shadow"
                  >
                    <div className="deduction-address">
                      {" "}
                      {deduction.address}{" "}
                    </div>
                    <button className="deduction-name">
                      {deduction.names}
                    </button>
                  </div>
                ))}
                <div>
                  <div
                    onClick={handleClickPrev}
                    disabled={currentPage === 0}
                    className="form-buttons-left-icon cursor-pointer"
                  >
                    <BgArrowLeft />
                  </div>
                  <div
                    onClick={handleClickNext}
                    disabled={currentPage === totalPages - 1}
                    className="form-button-right-icon cursor-pointer"
                  >
                    <BgArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-2 deduction-table mt-3">
            <div className="grid grid-cols-4 deduction-table-heading gap-5">
              <div>Description </div>
              <div>Expense</div>
              <div>GST</div>
              <div>Type</div>
            </div>

            <div className="team-line mt-2"></div>
            {rentalDeductions.map((deduction) => (
              <div>
                <div
                  key={deduction.id}
                  className="grid grid-cols-4 deduction-text mt-2 gap-5"
                >
                  <div className="flex items-center">
                    {deduction.description}
                  </div>
                  <div className="flex items-center">{deduction.expense}</div>
                  <div className="flex items-center">{deduction.gst}</div>
                  <div className="flex items-center">{deduction.type}</div>
                </div>
                <div className="team-line mt-2"></div>
              </div>
            ))}
          </div>

          <div className="px-5 mb-5 flex justify-between deduction-counter">
            <div>Total Amount</div>
            <div>650</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default AbnDeduction;
