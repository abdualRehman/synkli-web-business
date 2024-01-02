import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import QuestionFormPage from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/question-form-pages/QuestionFormPage";
import EditQuestionForm from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/question-form-pages/EditQuestionForm";
import AddNewQuestion from "../../../components/workplace-content/appointment-reminder-pages/online-booking-pages/question-form-pages/AddNewQuestion";
const QuestionForm = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showEditQuestionForm, setShowEditQuestionForm] = useState(false);
  const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditQuestionForm = () => {
    setShowEditQuestionForm(!showEditQuestionForm);
  };
  const toggleAddNewQuestion = () => {
    setShowAddNewQuestion(!showAddNewQuestion);
  };
  return (
    <div className="app-dashboard">
      {showEditQuestionForm && (
        <EditQuestionForm toggleEditQuestionForm={toggleEditQuestionForm} />
      )}
      {showAddNewQuestion && (
        <AddNewQuestion toggleAddNewQuestion={toggleAddNewQuestion} />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isOpen ? "squeeze" : ""}`}>
        <QuestionFormPage
          toggleEditQuestionForm={toggleEditQuestionForm}
          toggleAddNewQuestion={toggleAddNewQuestion}
        />
      </div>
    </div>
  );
};

export default QuestionForm;
