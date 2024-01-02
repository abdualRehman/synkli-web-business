import QuestionFormJumbo from "./QuestionFormJumbo";
import QuestionFormTable from "./QuestionFormTable";
import "./css/questionForm.css";
const QuestionFormPage = ({ toggleEditQuestionForm, toggleAddNewQuestion }) => {
  return (
    <div>
      <QuestionFormJumbo />
      <div>
        <QuestionFormTable
          toggleEditQuestionForm={toggleEditQuestionForm}
          toggleAddNewQuestion={toggleAddNewQuestion}
        />
      </div>
    </div>
  );
};
export default QuestionFormPage;
