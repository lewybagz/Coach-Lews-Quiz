import PropTypes from "prop-types";

const AnswerButtonsElement = ({
  answers,
  handleAnswerClick,
  showCorrectAnswer,
  correctAnswerIndex,
  incorrectAnswerIndex,
}) => {
  return (
    <nav id="answer-buttons" className="btn-container">
      {answers.map((answer, index) => (
        <button
          key={index}
          disabled={showCorrectAnswer}
          className={`btn ${getButtonClass(
            index,
            correctAnswerIndex,
            incorrectAnswerIndex,
            showCorrectAnswer
          )}`}
          onClick={() => handleAnswerClick(answer)}
        >
          {answer}
        </button>
      ))}
    </nav>
  );
};

const getButtonClass = (
  index,
  correctAnswerIndex,
  incorrectAnswerIndex,
  showCorrectAnswer
) => {
  let buttonClass = "";
  if (showCorrectAnswer) {
    if (index === correctAnswerIndex) return "correct-answer";
  }
  if (index === incorrectAnswerIndex) return "incorrect-answer";
  return buttonClass;
};

export default AnswerButtonsElement;

AnswerButtonsElement.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  showCorrectAnswer: PropTypes.bool.isRequired,
  correctAnswerIndex: PropTypes.number,
  incorrectAnswerIndex: PropTypes.number,
};
