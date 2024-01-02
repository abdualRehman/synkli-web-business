import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BgDeleteIcon } from "../../../../utills/svgs/BgDeleteIcon";

import _ from "lodash";
import {
  archiveTaskStatusThunk,
  updateStatusThunk,
} from "store/workspace/workspaceTasks";
import { BUSINESS_ID } from "utills/globalVars";
import { generateId } from "utills/uid";
import ConfirmationModal from "utills/confirmationModal";
const OSdynamicStatus = ({
  toggleLogs,
  page,
  filteredStatuses,
  getAllStatuses,
  pageSize,
  count,
  handleChangePage,
}) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [statusLoader, setStatusLoader] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
   const [task_status_id, setTaskStatus] = useState("")

  const handleToggle = (statusId) => {
    const findStatus = filteredStatuses?.find(
      (status) => status.task_status_id === statusId
    );

    const payload = {
      task_status_id: statusId,
      business_id,
      partial_notification:
        findStatus.partial_notification === "active" ? "inactive" : "active",
    };
    dispatch(updateStatusThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setStatuses((prevStatuses) =>
            prevStatuses.map((status) => {
              if (status.task_status_id === statusId) {
                return {
                  ...status,
                  partial_notification:
                    status.partial_notification === "active"
                      ? "inactive"
                      : "active",
                };
              }

              return status;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(findStatus);
  };

  function toggleInApp(statusId) {
    const findStatus = filteredStatuses?.find(
      (status) => status.task_status_id === statusId
    );

    const payload = {
      task_status_id: statusId,
      business_id,
      in_app_notification:
        findStatus.in_app_notification === "active" ? "inactive" : "active",
    };
    dispatch(updateStatusThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setStatuses((prevStatuses) =>
            prevStatuses.map((status) => {
              if (status.task_status_id === statusId) {
                return {
                  ...status,
                  in_app_notification:
                    status.in_app_notification === "active"
                      ? "inactive"
                      : "active",
                };
              }
              console.log(status);
              return status;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleEmailRemainder(statusId) {
    const findStatus = filteredStatuses?.find(
      (status) => status.task_status_id === statusId
    );

    const payload = {
      task_status_id: statusId,
      business_id,
      email_notification:
        findStatus.email_notification === "active" ? "inactive" : "active",
    };

    dispatch(updateStatusThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setStatuses((prevStatuses) =>
            prevStatuses.map((status) => {
              if (status.task_status_id === statusId) {
                return {
                  ...status,
                  email_notification:
                    status.email_notification === "active"
                      ? "inactive"
                      : "active",
                };
              }
              console.log(status);
              return status;
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = () => {
    setIsConfirmationOpen(false)
    const payload = {
      business_id,
      task_status_id,
    };

    setStatusLoader(true);
    dispatch(archiveTaskStatusThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setStatuses((prevStatuses) =>
            prevStatuses.filter(
              (status) => status.task_status_id !== task_status_id
            )
          );
          const payload = {
            business_id,
          };
          getAllStatuses(payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setStatusLoader(false);
      });
  }
  const archiveStatus = (task_status_id) => {
    setIsConfirmationOpen(true)
    setTaskStatus(task_status_id)
   
  };

  useEffect(() => {
    setStatuses(_.clone(filteredStatuses));
  }, [filteredStatuses]);
  return (
    <div className="md:mx-10 mx-5 mb-5">
         <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="  my-5 ">
        <div className="grid grid-cols-6 gap-5 dynamic-status-heading">
          <div className="flex gap-2 col-span-2 items-center">
            {/* <div>
              <input type="checkbox" />
            </div> */}
            <div>Status Name</div>
          </div>
          <div>Portal Notification</div>
          <div>In-app Notification</div>
          <div>Email Reminder</div>

          <div>Action</div>
        </div>
        <div className="team-line team-streched-line mt-2"></div>
        {statuses &&
          statuses?.map((status, index) => (
            <div key={generateId()}>
              <div className="grid grid-cols-6 gap-5 dynamic-status-table mt-3">
                <div className="flex gap-2 col-span-2 items-center">
                  {/* <div>
                    <input type="checkbox" />
                  </div> */}
                  <div>{status.label}</div>
                </div>
                <div className="flex items-center">
                  <input
                    checked={
                      status.partial_notification === "active" ? true : false
                    }
                    className="os-react-switch-checkbox"
                    id={`HandleToggle-${index} react-switch-new`}
                    type="checkbox"
                    onChange={() => handleToggle(status.id)}
                  />

                  <label
                    style={{
                      background:
                        status.partial_notification === "active"
                          ? "#B695F8"
                          : "",
                    }}
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                    onClick={() => handleToggle(status.task_status_id)}
                  >
                    <span className={`react-switch-button`} />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={
                      status.in_app_notification === "active" ? true : false
                    }
                    className="os-react-switch-checkbox"
                    id={`HandleToggle-${index} react-switch-new`}
                    type="checkbox"
                    onChange={() => toggleInApp(status.task_status_id)}
                  />

                  <label
                    style={{
                      background:
                        status.in_app_notification === "active"
                          ? "#B695F8"
                          : "",
                    }}
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                    onClick={() => toggleInApp(status.task_status_id)}
                  >
                    <span className={`react-switch-button`} />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked={
                      status.email_notification === "active" ? true : false
                    }
                    className="os-react-switch-checkbox"
                    id={`HandleToggle-${index} react-switch-new`}
                    type="checkbox"
                    onChange={() => toggleEmailRemainder(status.task_status_id)}
                  />

                  <label
                    style={{
                      background:
                        status.email_notification === "active" ? "#B695F8" : "",
                    }}
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                    onClick={() => toggleEmailRemainder(status.task_status_id)}
                  >
                    <span className={`react-switch-button`} />
                  </label>
                </div>

                <div className="flex gap-2 items-center">
                  {/* <div>
                    <BgPencilIcon />
                  </div> */}
                  <div
                    className="cursor-pointer"
                    onClick={() => archiveStatus(status.task_status_id)}
                  >
                    <BgDeleteIcon />
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
export default OSdynamicStatus;
