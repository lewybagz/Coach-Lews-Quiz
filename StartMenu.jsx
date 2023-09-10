import PropTypes from "prop-types";

const StartMenu = ({
  onStart,
  currentUser,
  displayInstructions,
  hideInstructions,
}) => {
  const startQuiz = () => {
    onStart(); // Existing code for starting the quiz
    hideInstructions(); // Close the instructions
  };
  return (
    <div className="start-menu">
      <h1>Welcome To Coach Lew&rsquo;s Quiz! {currentUser}!</h1>
      <button onClick={startQuiz} id="start-btn">
        Start Quiz
      </button>
      <button onClick={displayInstructions} id="instruction-btn">
        Instructions
      </button>
    </div>
  );
};

export default StartMenu;

StartMenu.propTypes = {
  onStart: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
  displayInstructions: PropTypes.func.isRequired,
  hideInstructions: PropTypes.func.isRequired,
};
