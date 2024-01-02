import { motion } from "framer-motion";
import { useState } from "react";
const DefaultReminderSettings = ({ toggleDefaultReminderSettings }) => {
  const [calendarHoursReminder, setCalendarHoursReminder] = useState(false);
  const toggleCalendarHoursReminder = () => {
    setCalendarHoursReminder(!calendarHoursReminder);
  };
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
              onClick={toggleDefaultReminderSettings}
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
              <div className="title">Default Reminder Settings</div>

              <div className="jumbo-dir mt-2">
                Appointments &gt; Settings{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Default Reminder Settings
                </span>
              </div>
            </div>
          </div>

          <div className="add-service-boundary">
            <div className="event-duration mt-3 mx-5">
              <div className="add-ann-form">
                <div className=" mt-3">
                  <div>
                    <div>
                      <label>Default Reminder Settings</label>
                    </div>
                    <div>
                      <select>
                        <option value="Sequence" selected>
                          Sequence
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Time of Day</label>
                    </div>
                    <div>
                      <input type="time" className="time-input" />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label>Booking</label>
                    </div>
                    <div>
                      <input type="text" placeholder="Write" />
                    </div>
                    <div className="mt-1">
                      <select>
                        <option value="Booking" selected>
                          Booking
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex justify-between">
                  <div>
                    {" "}
                    <label>Only Send Reminder During Calendar Hours</label>{" "}
                  </div>
                  <div>
                    <input
                      checked={calendarHoursReminder}
                      className="os-react-switch-checkbox"
                      id={`HandleToggle-$ react-switch-new`}
                      type="checkbox"
                      onChange={toggleCalendarHoursReminder}
                    />

                    <label
                      style={{ background: calendarHoursReminder && "#B695F8" }}
                      className="react-switch-label"
                      htmlFor={`react-switch-new`}
                      onClick={toggleCalendarHoursReminder}
                    >
                      <span className={`react-switch-button`} />
                    </label>
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <div>
                      <label>Confirmed Reply Text</label>
                    </div>
                    <div>
                      <input type="text" placeholder="[Confirmed]" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Declined Reply Text</label>
                    </div>
                    <div>
                      <input type="text" placeholder="[Declined]" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Reschedule Text</label>
                    </div>
                    <div>
                      <input type="text" placeholder="[Rescheduled]" />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label>Unknown Reply Text</label>
                    </div>
                    <div>
                      <input type="text" placeholder="[SMSREPLY]" />
                    </div>
                  </div>

                  <div>
                    <div>
                      <label>Appointment Reminder Delivered</label>
                    </div>
                    <div>
                      <input type="text" placeholder="[R]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center my-5">
                  <button className="service-save-btn">Save</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DefaultReminderSettings;
