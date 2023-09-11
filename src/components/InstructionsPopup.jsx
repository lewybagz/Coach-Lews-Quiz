import PropTypes from "prop-types";

const InstructionsPopup = ({ onClose }) => {
  return (
    <div className="instructions-popup">
      <button className="close-button" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <h1>How to Play</h1>
      <ul>
        <li>
          Hey there! Ready for a quiz-tastic adventure? You have two chances to
          get each question right!
        </li>
        <li>
          Oops! Didn&rsquo;t get it the first time? Don&rsquo;t worry! You have
          one more try to correct your answer.
        </li>
        <li>
          If the questions seem like riddles, hang in there! After 15 seconds, a
          shiny lightbulb icon &rsquo;<i className="fa-solid fa-lightbulb"></i>
          &rsquo; will show up. Click it, and you&rsquo;ll get a hint to help
          you out.
        </li>
        <li>
          Remember, you can only call for the lightbulb&rsquo;s help 3 times
          throughout the quiz, so use your hints wisely!
        </li>
        <li>
          If you click the correct answer, the box will turn green and
          you&rsquo;ll move on to the next question after a few seconds. Yay!
        </li>
        <li>
          If you click the wrong answer, the box will turn red, but don&rsquo;t
          be sad. You get another chance to make it right.
        </li>
        <li>
          Once you&rsquo;ve gone through all the questions, you&rsquo;ll see
          your super-duper score! Are you ready to be a quiz master?
        </li>
        <li>
          Click the &rsquo;Start&rsquo; button above when you&rsquo;re ready to
          roll. Have fun!
        </li>
      </ul>
    </div>
  );
};

export default InstructionsPopup;

InstructionsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
