import { useDispatch, useSelector } from "react-redux";
import "./css/businessSteps.css";
import { useEffect, useState } from "react";
import Ripples from "react-ripples";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { toastHandler } from "responseHanlder";
import {
  ERROR_TYPE_ERROR,
  ERROR_TYPE_SUCCESS,
  PERMISSIONS_MESSAGE,
} from "utills/globalVars";
import {
  getBusinessHoursThunk,
  updateBusinessHoursThunk,
} from "store/auth/slices";
import { generateId } from "utills/uid";
const BusinessHours = () => {
  const dispatch = useDispatch();
  const [hoursLoader, setHourseLoader] = useState(false);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [data, setData] = useState(null);
  const [dayIndex, setDayIndex] = useState(null);
  const [weekInView, setWeekInView] = useState(null);
  const [hoursUpdated, setHoursUpdated] = useState(false);

  const [formData, setFormData] = useState({
    day: "",
    from: "",
    to: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(value);
  };

  const handleSubmit = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Profile?.admin ||
      allPermissions?.Profile?.write
    ) {
      const findDay = data[dayIndex];

      const payload = {
        working_hour_id: findDay?.working_hour_id,
        day: findDay?.day,
        start_time: formData?.from,
        end_time: formData?.to,
        closed: findDay?.closed,
      };
      console.log(payload);

      const hasEmptyValue = Object.values(payload).some((value) => {
        return (
          value === "" ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0)
        );
      });
      if (hasEmptyValue) {
        return toastHandler(
          "Please fill in all required fields.",
          ERROR_TYPE_ERROR
        );
      }
      setHourseLoader(true);
      dispatch(updateBusinessHoursThunk(payload))
        .then((response) => {
          console.log(response.payload);
          if (response.payload) {
            toastHandler("hours updated", ERROR_TYPE_SUCCESS);
            setHoursUpdated(!hoursUpdated);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setHourseLoader(false);
        });
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }
  };

  function dayManager(index) {
    console.log(index);
    const findDay = data[index];
    setWeekInView(findDay);
    setDayIndex(index);
  }

  const handleStatus = (working_hour_id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.working_hour_id === working_hour_id
          ? { ...item, closed: !item.closed }
          : item
      )
    );
  };
  useEffect(() => {
    setHourseLoader(true);
    dispatch(getBusinessHoursThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setData(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setHourseLoader(false);
      });
  }, [dispatch, hoursUpdated]);
  return (
    <div className="md:px-10 px-5 mt-3 ">
      <div className="b-h-container  shadow-md">
        <div className="b-h-1 ">
          {data &&
            data?.map((day, index) => (
              <div
                onClick={() => dayManager(index)}
                key={generateId()}
                className={`flex items-center justify-between day px-3 py-2 shadow cursor-pointer mx-5 mt-5 rounded-lg ${
                  !day?.closed === false ? "day-opacity" : "true-day"
                }`}
              >
                <div className="flex items-center">
                  <input
                    checked={!day?.closed}
                    className="react-switch-checkbox"
                    id={`HandleToggle-${day?.working_hour_id} react-switch-new`}
                    type="checkbox"
                    onChange={() => handleStatus(index)}
                  />

                  <label
                    style={{ background: !day?.closed && "#B695F8" }}
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                    onClick={() => handleStatus(day?.working_hour_id)}
                  >
                    <span className={`react-switch-button`} />
                  </label>
                </div>
                <div className=" flex gap-5 items-center ">
                  {" "}
                  <span>{day?.day}</span>
                  {!day?.closed === true ? (
                    <span>
                      {day?.start_time} - {day?.end_time}
                    </span>
                  ) : (
                    "Closed"
                  )}{" "}
                </div>
                <div className=" text-right ">
                  {" "}
                  {!day?.closed === true ? (
                    <span className="day-icon">&gt;</span>
                  ) : (
                    <span className="day-icon">&lt;</span>
                  )}{" "}
                </div>
              </div>
            ))}
        </div>
        <div className="b-h-2 p-3">
          <div className="title">{weekInView?.day}</div>
          <div className="sub-title mt-2">Opening Hours</div>

          <div className="day-time flex gap-5 mt-1">
            <div>
              <input
                onChange={handleInputChange}
                name="from"
                type="time"
                className="pr-16 pl-2 py-2"
              />
            </div>
            <div>
              <input
                onChange={handleInputChange}
                name="to"
                type="time"
                className="pr-16 pl-2 py-2"
              />
            </div>
          </div>

          <div className="day-btns mt-5 flex gap-5">
            <button className="dim-btn px-10 py-2 rounded-lg">Cancel</button>
            <Ripples during={2000} color="#333333">
              <button
                onClick={handleSubmit}
                className="add-btn px-10 py-2 rounded-lg text-white"
              >
                Save
              </button>
            </Ripples>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHours;
