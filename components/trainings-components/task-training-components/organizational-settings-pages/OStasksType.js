import { useEffect, useState } from "react";
import "./css/organizationalSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import {
  archiveTaskTypeThunk,
  getAllTaskType,
  getAllTaskTypeThunk,
} from "store/workspace/workspaceTasks";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { PAGINATION_PAGE_SIZE } from "utills/envVars";
import { generateId } from "utills/uid";
import {
  formateDate,
  formateDateAndTime,
  formateDateTime,
} from "utills/moment";
import Pagination from "components/pagination";
import { BgEditIcon } from "utills/svgs/BgEditIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
const OStasksType = ({ searchTerm, typesUpdated }) => {
  const [page, setPage] = useState(1);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllTaskType);

  const filtereData = data?.rows.filter((task) =>
    task.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [typeLoader, setTypeLoader] = useState(false);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    getAllTypes({
      business_id,
    });
  };
  const getAllTypes = (payload) => {
    dispatch(setLoader(true));
    dispatch(getAllTaskTypeThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    const payload = {
      business_id,
    };
    getAllTypes(payload);
  }, [typesUpdated]);

  const deleteType = (task_type_id) => {
    setTypeLoader(false);
    const payload = { business_id, task_type_id };
    dispatch(archiveTaskTypeThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          const payload = {
            business_id,
          };
          getAllTypes(payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTypeLoader(false);
      });
  };

  return (
    <div className="mx-5 ">
      <div className=" mt-5 ">
        <div className=" task-type-heading grid grid-cols-4 gap-5">
          <div className="flex gap-2 items-center">
            {/* <div>
              <input type="checkbox" />
            </div> */}
            <div>Task Type Names</div>
          </div>
          <div className="flex gap-2 items-center"> Created Date </div>
          <div className="flex gap-2 items-center"> Last Updated </div>

          <div className="flex gap-2 items-center">Action</div>
        </div>
        <div className="team-line mt-3 team-streched-line"></div>
        {data &&
          filtereData?.map((task, index) => (
            <div key={generateId()} className="mt-3">
              <div className=" grid grid-cols-4 gap-5 task-type-table">
                <div className="flex gap-2 items-center">
                  {/* <div>
                    <input type="checkbox" />
                  </div> */}
                  <div>{task?.label}</div>
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  {formateDate(task.created_at)}{" "}
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  {formateDate(task.updated_at)}{" "}
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex gap-2">
                    {/* <div>
                      <BgEditIcon />
                    </div> */}
                    <div
                      className="cursor-pointer"
                      onClick={() => deleteType(task.task_type_id)}
                    >
                      <BgDeleteIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-line team-streched-line mt-3"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OStasksType;

// page={page}
// pageSize={pageSize}
// count={count}
// rows={filteredStatuses?.length}
// onChangePage={handleChangePage}
