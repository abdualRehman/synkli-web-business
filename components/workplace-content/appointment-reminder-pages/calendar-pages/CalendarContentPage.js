import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";
import { ThinArrowRight } from "../../../../utills/svgs/ThinArrowRight";
import { ThinArrowLeft } from "../../../../utills/svgs/ThinArrowLeft";
import { CalendarIcon } from "../../../../utills/svgs/CalendarIcon";
const CalendarContentPage = ({ toggleEditEmp }) => {
  const calendarRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("timeGridDay");

  const handleDayButtonClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView("timeGridDay");
      setView("timeGridDay");
    }
  };

  const handleWeekButtonClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView("timeGridWeek");
      setView("timeGridWeek");
    }
  };

  const handleMonthButtonClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView("dayGridMonth");
      setView("dayGridMonth");
    }
  };

  const handlePrevButtonClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setSelectedDate(calendarApi.view.title);
    }
  };

  const handleTodayButtonClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setSelectedDate(calendarApi.view.title);
    }
  };

  const handleNextButtonClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setSelectedDate(calendarApi.view.title);
    }
  };

  const slotLabelContent = ({ date }) => (
    <div className="custom-slot-label">
      {date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
    </div>
  );

  const eventContent = (eventInfo) => {
    const { title, start, end } = eventInfo.event;

    // Format the start and end dates
    const startDate = start.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endDate = end.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });

    return (
      <div
        style={{
          backgroundColor: "#DCDCDC",
          color: "#000",
          borderTop: "1px solid #6576B2",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: "0.75rem",

          width: "100%",
        }}
      >
        <div className="p-1 main-event">
          <div className="event-dates flex gap-1  ">
            {" "}
            <div>{`${startDate} AM - ${endDate} AM`}</div>{" "}
            <div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#B695F8" />
                <path
                  d="M10.9681 20.0702V17.7842L11.2921 18.0902C10.4281 18.0782 9.61213 17.9522 8.84413 17.7122C8.07613 17.4602 7.40412 17.0822 6.82812 16.5782L7.36813 15.3902C7.94413 15.8582 8.55013 16.2062 9.18613 16.4342C9.82212 16.6622 10.5661 16.7762 11.4181 16.7762C12.4501 16.7762 13.2181 16.5782 13.7221 16.1822C14.2261 15.7742 14.4781 15.2522 14.4781 14.6162C14.4781 14.1002 14.2921 13.6922 13.9201 13.3922C13.5601 13.0802 12.9601 12.8342 12.1201 12.6542L10.3201 12.2762C9.22813 12.0362 8.41813 11.6462 7.89013 11.1062C7.36213 10.5542 7.09813 9.82824 7.09813 8.92824C7.09813 8.23223 7.26612 7.61423 7.60212 7.07423C7.95012 6.52223 8.43012 6.09023 9.04213 5.77823C9.65413 5.45423 10.3681 5.27423 11.1841 5.23823L10.9681 5.49023V3.24023H12.1921V5.49023L11.9581 5.23823C12.5941 5.26223 13.2421 5.40023 13.9021 5.65223C14.5621 5.90423 15.1201 6.28223 15.5761 6.78623L15.0721 7.93824C14.5921 7.44623 14.0581 7.09223 13.4701 6.87623C12.8821 6.64823 12.2281 6.53424 11.5081 6.53424C10.5961 6.53424 9.87013 6.75024 9.33012 7.18224C8.79012 7.61424 8.52013 8.18424 8.52013 8.89223C8.52013 9.44423 8.68813 9.88824 9.02413 10.2242C9.37213 10.5602 9.93012 10.8062 10.6981 10.9622L12.4981 11.3582C13.6621 11.5982 14.5261 11.9762 15.0901 12.4922C15.6541 12.9962 15.9361 13.6802 15.9361 14.5442C15.9361 15.2282 15.7621 15.8282 15.4141 16.3442C15.0661 16.8482 14.5921 17.2502 13.9921 17.5502C13.3921 17.8382 12.6961 18.0122 11.9041 18.0722L12.1921 17.7662V20.0702H10.9681Z"
                  fill="white"
                />
              </svg>
            </div>{" "}
          </div>
          <div className="event-title">{title}</div>
        </div>
      </div>
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const dayCellContent = (props) => {
    const { date } = props;
    const day = date.getDate();
    const isMonthView = props.view.type === "dayGridMonth";
    const isTodayDate = isToday(date) && isMonthView;

    return (
      <div className={`custom-day-cell ${isTodayDate ? "today" : ""}`}>
        <span>{day}</span> <br />
        {isTodayDate && <span className="today-label">Today</span>}
      </div>
    );
  };
  return (
    <div className="calendar-content-page">
      <div className="custom-buttons flex gap-5 flex-wrap px-10 my-3">
        <div className="custom-togglers flex gap-1">
          <button onClick={handlePrevButtonClick}>
            <div className="prev-svg">
              <ThinArrowLeft />
            </div>
          </button>
          <button onClick={handleTodayButtonClick}>Today</button>
          <button onClick={handleNextButtonClick}>
            <div className="next-svg">
              <ThinArrowRight />
            </div>
          </button>
        </div>

        <div className="select-employee">
          <select>
            <option value="" selected disabled>
              Select Employee
            </option>
          </select>
        </div>

        <div className="current-date-container">{selectedDate}</div>

        <div className="calendar-togglers">
          <button
            onClick={() => handleDayButtonClick()}
            className={`${
              view === "timeGridDay" ? "active-toggler" : "non-active-toggler"
            }`}
          >
            day
          </button>
          <button
            onClick={() => handleWeekButtonClick()}
            className={`${
              view === "timeGridWeek" ? "active-toggler" : "non-active-toggler"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => handleMonthButtonClick()}
            className={`${
              view === "dayGridMonth" ? "active-toggler" : "non-active-toggler"
            }`}
          >
            Month
          </button>
          <button className="non-active-toggler">Day List</button>
          <div className="non-active-toggler">Week List</div>
        </div>

        <div
          onClick={toggleEditEmp}
          className="add-appointment-btn cursor-pointer flex gap-1"
        >
          <div>
            <CalendarIcon />
          </div>
          <div>Add Appointment</div>
        </div>
      </div>

      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          allDayContent={() => null}
          allDaySlot={false}
          slotLabelContent={slotLabelContent}
          headerToolbar={{
            start: "",
            center: "",
            end: "",
          }}
          events={[
            {
              title: "Event 1",
              start: "2023-05-24T10:00:00",
              end: "2023-05-24T12:00:00",
            },

            {
              title: "Event 2",
              start: "2023-05-16T14:00:00",
              end: "2023-05-19T16:00:00",
            },
            {
              title: "Event 3",
              start: "2023-05-26T09:00:00",
              end: "2023-05-26T11:00:00",
            },
            {
              title: "Event 4",
              start: "2023-05-26T01:00:00",
              end: "2023-05-26T01:20:00",
            },
          ]}
          eventColor="#DCDCDC"
          eventTextColor="#000"
          eventContent={eventContent}
          dayCellContent={dayCellContent}
          dayHeaderContent={({ date }) => (
            <div
              style={{
                fontWeight: "500",
                color: "black",
                fontFamily: "poppins",
                height: "6vh",
                fontSize: "0.9rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="custom-day-header"
            >
              {date.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default CalendarContentPage;
