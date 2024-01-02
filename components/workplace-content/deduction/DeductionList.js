import Pagination from "components/pagination";
import { BUSINESS_ID, TOAST_TYPE_ERROR } from "utills/globalVars";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { archiveDeductionThunk } from "store/workspace/workspaceDeduction";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import printJS from "print-js";
import { toastHandler } from "responseHanlder";
import { PrinterIcon } from "utills/svgs/PrinterIcon";
import { BgPdfIcon } from "utills/svgs/BgPdfIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import ConfirmationModal from "utills/confirmationModal";
import { useState } from "react";

const DeductionList = ({
  filteredDeductions,

  getAllDeductions,
}) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { allPermissions } = useSelector((state) => state.global);
  const { data: loginData } = useSelector((state) => state.login);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [delId, setDelId] = useState("");
  const handleArchiveDeduction = (business_deduction_id) => {
    setDelId(business_deduction_id);
    setIsConfirmationOpen(true);
  };

  const deleteDeduction = () => {
    if (
      allPermissions.Deductions?.write ||
      !loginData?.is_employee ||
      allPermissions.Deductions.admin
    ) {
      const payload = {
        business_id,
        business_deduction_id: delId,
      };
      dispatch(archiveDeductionThunk(payload))
        .then((response) => {
          setDelId("");
          const payload = {
            business_id,
          };
          getAllDeductions(payload);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      toastHandler(
        "You dont have permission to access this page",
        TOAST_TYPE_ERROR
      );
    }
    setIsConfirmationOpen(false);
  };

  const viewDeductionpFile = (url) => {
    window.open(url, "_blank");
  };
  const prinDeductionpFile = (url) => {
    printJS(url);
  };
  return (
    <div className="md:px-10 mt-5 px-5 text-black deduction-container">
      <div className="deduction-table">
        <div className="flex justify-between d-table-heading">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flex gap-2 items-center">Occupation</div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="mr-32">Action</span>
          </div>
        </div>
        <div className="team-line mt-2"></div>

        <div className="d-table-content ">
          {filteredDeductions.map((d) => (
            <div key={d.id}>
              <div className="flex justify-between items-center mt-3">
                <div className="gap-2 flex items-center">
                  <div>
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>{d.title}</div>
                </div>
                <div className="flex gap-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => prinDeductionpFile(d?.attachment?.name)}
                  >
                    <PrinterIcon />
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => viewDeductionpFile(d?.attachment?.name)}
                  >
                    <BgPdfIcon />
                  </div>
                  <div>
                    <a href={d?.attachment?.name} download="file">
                      <svg
                        width="26"
                        height="24"
                        viewBox="0 0 36 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          opacity="0.05"
                          width="36"
                          height="30"
                          rx="15"
                          fill="url(#paint0_linear_1344_704)"
                        />
                        <path
                          d="M18 18.5697V7M18 18.5697L14 14.4309M18 18.5697L22 14.4309M8 18.8613L8.621 21.4325C8.72915 21.8801 8.97882 22.2776 9.33033 22.5616C9.68184 22.8456 10.115 22.9999 10.561 23H25.439C25.885 22.9999 26.3182 22.8456 26.6697 22.5616C27.0212 22.2776 27.2708 21.8801 27.379 21.4325L28 18.8613"
                          stroke="url(#paint1_linear_1344_704)"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_1344_704"
                            x1="19.7664"
                            y1="0.37257"
                            x2="19.7476"
                            y2="30.0001"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#101828" />
                            <stop offset="0.998509" stop-color="#0D1B37" />
                            <stop offset="1" stop-color="#0A1E46" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_1344_704"
                            x1="8.30928"
                            y1="7.00001"
                            x2="27.8837"
                            y2="7.99119"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#101828" />
                            <stop offset="1" stop-color="#0A1E46" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </a>
                  </div>

                  <div>
                    <svg
                      width="26"
                      height="24"
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
                        d="M26.8846 7H9.11538C7.94709 7 7 7.89543 7 9V21C7 22.1046 7.94709 23 9.11538 23H26.8846C28.0529 23 29 22.1046 29 21V9C29 7.89543 28.0529 7 26.8846 7Z"
                        stroke="#B695F8"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11 10L18 16L25 10"
                        stroke="#B695F8"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleArchiveDeduction(d.business_deduction_id)
                    }
                  >
                    <BgDeleteIcon />
                  </div>
                </div>
              </div>

              <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={deleteDeduction}
              />
              <div className="team-line mt-3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* <Pagination
        page={page}
        pageSize={pageSize}
        count={count}
        rows={filteredDeductions.length}
        onChangePage={handleChangePage}
      /> */}
    </div>
  );
};
export default DeductionList;
