import "./css/calendar.css";
import CalendarJumbo from "./CalendarJumbo";
import CalendarContent from "./CalendarContent";
import CalendarContentPage from "./CalendarContentPage";
const CalendarPage = ({ toggleEditEmp }) => {
  return (
    <div>
      <div>
        <CalendarJumbo />
      </div>
      <div>
        <CalendarContentPage toggleEditEmp={toggleEditEmp} />
      </div>
    </div>
  );
};

export default CalendarPage;
