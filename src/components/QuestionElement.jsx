import { PropTypes } from "prop-types";

const QuestionElement = ({ question, currentQuestion, totalQuestions }) => {
  const progress = `Question ${currentQuestion + 1} of ${totalQuestions}`;

  return (
    <article id="question-container">
      <div id="progress-container">
        <span id="progress">{progress}</span>
      </div>
      <span id="question">{question}</span>
    </article>
  );
};

export default QuestionElement;

QuestionElement.propTypes = {
  question: PropTypes.string.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};
