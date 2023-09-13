import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QuestionElement from "./QuestionElement";
import AnswerButtonsElement from "./AnswerButtonsElement";
import { useQuizTimer } from "./QuizLogic";
import { calculateScore } from "./QuizLogic";
import { shuffleArray, getRandomMessage } from "./QuizLogic";
import { LeaderboardComponent } from "./LeaderboardComponent";
import { getDatabase, ref, get, set } from "firebase/database";
const db = getDatabase();

export function QuizData() {
  let currentUser;
  get(ref(db, "currentUser")).then((snapshot) => {
    if (snapshot.exists()) {
      currentUser = snapshot.val();
    }
  });

  const questions = [
    {
      question: "How many points is a touchdown worth?",
      answers: [
        { text: "3", correct: false },
        { text: "6", correct: true },
        { text: "7", correct: false },
        { text: "2", correct: false },
      ],
      hint: "You can count this on two hands but don't need all your fingers.",
    },
    {
      question:
        "What is the term for stopping the opponent's offensive play without turning over possession?",
      answers: [
        { text: "Tackle", correct: true },
        { text: "Interception", correct: false },
        { text: "Fumble", correct: false },
        { text: "Touchdown", correct: false },
      ],
      hint: "It's what you do to a falling leaf, but on the football field.",
    },
    {
      question: "Which of these is NOT a position on a football team?",
      answers: [
        { text: "Quarterback", correct: false },
        { text: "Shortstop", correct: true },
        { text: "Linebacker", correct: false },
        { text: "Wide Receiver", correct: false },
      ],
      hint: "This player would fit better in a baseball diamond.",
    },
    {
      question:
        "What is the term for running the football into the opponent's end zone from the field of play?",
      answers: [
        { text: "Rush", correct: false },
        { text: "Field Goal", correct: false },
        { text: "Touchdown", correct: true },
        { text: "Sack", correct: false },
      ],
      hint: "When you reach the end, you're touching down!",
    },
    {
      question:
        "What is the maximum number of players allowed on the field per team?",
      answers: [
        { text: "11", correct: true },
        { text: "9", correct: false },
        { text: "227,462", correct: false },
        { text: "10", correct: false },
      ],
      hint: "One more than a soccer team's players on the field.",
    },
    {
      question:
        "What is the term for catching the ball from the opposing team's kick?",
      answers: [
        { text: "No Clue", correct: false },
        { text: "Kickoff", correct: false },
        { text: "Return", correct: true },
        { text: "Snap", correct: false },
      ],
      hint: "After a kick, it's your turn to run!",
    },
    {
      question:
        "What is the term for a play where the quarterback throws the ball to a receiver?",
      answers: [
        { text: "Handoff", correct: false },
        { text: "Pass", correct: true },
        { text: "Rush", correct: false },
        { text: "Lebron James", correct: false },
      ],
      hint: "No handoffs here, the ball takes flight!",
    },
    {
      question:
        "What is it called when a player loses control of the ball and drops it?",
      answers: [
        { text: "Interception", correct: false },
        { text: "Fumble", correct: true },
        { text: "Offside", correct: false },
        { text: "Holding", correct: false },
      ],
      hint: "Oops! Don't let the ball slip from your grip!",
    },
    {
      question:
        "What is the term for a defensive player catching a pass intended for an offensive player?",
      answers: [
        { text: "Tackle", correct: false },
        { text: "Interception", correct: true },
        { text: "Fumble", correct: false },
        { text: "Sack", correct: false },
      ],
      hint: "A 'catchy' way for the defense to turn the tables!",
    },
    {
      question:
        "What is it called when the kicker kicks the ball through the opponent's goal posts?",
      answers: [
        { text: "Punt", correct: false },
        { text: "Field Goal", correct: true },
        { text: "Touchdown", correct: false },
        { text: "Extra Point", correct: false },
      ],
      hint: "Aim between the poles to score these three points.",
    },
    {
      question: "Which of these results in a loss of yardage for the offense?",
      answers: [
        { text: "Sack", correct: true },
        { text: "Interception", correct: false },
        { text: "Fumble", correct: false },
        { text: "Rush", correct: false },
      ],
      hint: "It's what happens when the defense bags the QB!",
    },
    {
      question:
        "What is the term for a short kick used instead of a regular kickoff?",
      answers: [
        { text: "Punt", correct: false },
        { text: "Onside Kick", correct: true },
        { text: "Field Goal", correct: false },
        { text: "Hail Mary", correct: false },
      ],
      hint: "This kick is for when you're on your own side.",
    },
    {
      question:
        "What is it called when an offensive player moves before the snap?",
      answers: [
        { text: "Offside", correct: false },
        { text: "False Start", correct: true },
        { text: "Holding", correct: false },
        { text: "Pass Interference", correct: false },
      ],
      hint: "Jumping the gun? This call will set you back.",
    },
    {
      question:
        "What is the term for a pass thrown deep down the field as a last resort?",
      answers: [
        { text: "Slant", correct: false },
        { text: "Screen", correct: false },
        { text: "Hail Mary", correct: true },
        { text: "Flea Flicker", correct: false },
      ],
      hint: "It's a prayer thrown long down the field.",
    },
    {
      question: "Who is the player that kicks field goals and extra points?",
      answers: [
        { text: "Punter", correct: false },
        { text: "Kicker", correct: true },
        { text: "Quarterback", correct: false },
        { text: "Linebacker", correct: false },
      ],
      hint: "This player puts the foot in football.",
    },
    {
      question:
        "What is it called when a player grabs and holds onto another player?",
      answers: [
        { text: "Holding", correct: true },
        { text: "A Hug", correct: false },
        { text: "False Start", correct: false },
        { text: "Roughing the Passer", correct: false },
      ],
      hint: "When it's more of a 'grab' than a 'block.'",
    },
    {
      question:
        "What is the term for a play where the quarterback hands the ball to a running back?",
      answers: [
        { text: "Pass", correct: false },
        { text: "Handoff", correct: true },
        { text: "Sack", correct: false },
        {
          text: "The QB Is Scared",
          correct: false,
        },
      ],
      hint: "The QB gives, not throws, the ball for this play.",
    },
    {
      question:
        "When a defensive player tackles the quarterback behind the line of scrimmage it is called a?",
      answers: [
        { text: "Sack", correct: true },
        { text: "Interception", correct: false },
        { text: "Fumble", correct: false },
        { text: "Rush", correct: false },
      ],
      hint: " Defensively, it's like getting the QB in a 'sack.'",
    },
    {
      question: "Who Is Your Favorite Coach?",
      answers: [
        { text: "Coach Lew", correct: true },
        { text: "Coach Lew", correct: true },
        { text: "Coach Lew", correct: true },
        { text: "Coach JonJon", correct: false },
      ],
      hint: "He's the favorite for a reason. Guess wisely!",
    },
    {
      question: "What is the area called where touchdowns are scored?",
      answers: [
        { text: "End Zone", correct: true },
        { text: "No Man's Land", correct: false },
        { text: "Field Goal Area", correct: false },
        { text: "Safety Zone", correct: false },
      ],
      hint: "It's the ultimate destination for a drive.",
    },
    {
      question:
        "What do you call a play where the ball is kicked off the ground to score points?",
      answers: [
        { text: "Field Goal", correct: true },
        { text: "Punt", correct: false },
        { text: "Touchdown", correct: false },
        { text: "Rush", correct: false },
      ],
      hint: "Think '3 points' without carrying the ball to the end zone.",
    },
    {
      question:
        "What is the term used for advancing the football by running rather than passing?",
      answers: [
        { text: "Rushing", correct: true },
        { text: "Flying", correct: false },
        { text: "Walking", correct: false },
        { text: "Jogging", correct: false },
      ],
      hint: "It's speedy, but the ball doesn't leave the ground.",
    },
    {
      question:
        "What is the penalty for running out of time on the play clock?",
      answers: [
        { text: "Delay of Game", correct: true },
        { text: "False Start", correct: false },
        { text: "Holding", correct: false },
        { text: "Offside", correct: false },
      ],
      hint: "The game must go on, with no time to 'delay.'",
    },
    {
      question: "What is a 'two-point conversion'?",
      answers: [
        { text: "2 extra points after a touchdown", correct: true },
        { text: "A safety", correct: false },
        { text: "A field goal", correct: false },
        { text: "A 2-yard penalty", correct: false },
      ],
      hint: "It’s like an extra point, but twice as rewarding.",
    },
    {
      question:
        "What is it called when the offense lines up behind the line of scrimmage?",
      answers: [
        { text: "Formation", correct: true },
        { text: "Lineup", correct: false },
        { text: "Blocking", correct: false },
        { text: "Rushing", correct: false },
      ],
      hint: "It's how they 'form' before the snap.",
    },
    {
      question:
        "What is the term for when the quarterback is tackled before passing or handing off the ball?",
      answers: [
        { text: "Sack", correct: true },
        { text: "Interception", correct: false },
        { text: "Fumble", correct: false },
        { text: "Rush", correct: false },
      ],
      hint: "It's like putting the QB in a 'bag.'",
    },
    {
      question: "What is the term for when the ball crosses over the sideline?",
      answers: [
        { text: "Out of Bounds", correct: true },
        { text: "Offside", correct: false },
        { text: "Inception", correct: false },
        { text: "Touchback", correct: false },
      ],
      hint: "The ball has left the field of play.",
    },
    {
      question:
        "What do you call the time duration a team has to execute a play?",
      answers: [
        { text: "Half-Time", correct: false },
        { text: "Play Clock", correct: true },
        { text: "Timeout", correct: false },
        { text: "Intermission", correct: false },
      ],
      hint: "Tick-tock, you're against the clock.",
    },
    {
      question: "What is the term for blocking a punt or a field goal?",
      answers: [
        { text: "Interception", correct: false },
        { text: "Block", correct: true },
        { text: "Fumble", correct: false },
        { text: "Sack", correct: false },
      ],
      hint: "Prevent the ball from flying high.",
    },
  ];

  // ASK ABOUT IMPORTING QUESTIONS FROM EXTERNAL FILE

  const getSuccessMessages = () => [
    `Nailed it, ${currentUser}! You must be a genius or something!`,
    "Right on! You're cooking with gas now!",
    `You got it, ${currentUser}! Are you sure you're not cheating?`,
    "Correct! You're on fire! (Not literally, of course.)",
    "Bingo! You must have eaten your brain food today!",
  ];

  const getIncorrectMessages = () => [
    `Oops! That's not it, ${currentUser}. But hey, no one's perfect!`,
    "Wrong! But don't worry, I still believe in you!",
    "Nope! But don't feel bad, even Einstein got things wrong!",
    `Incorrect, ${currentUser}! But hey, at least you're consistent!`,
    "Missed it by that much! Keep your chin up, you'll get the next one!",
  ];

  return {
    questions,
    getSuccessMessages,
    getIncorrectMessages,
  };
}

export const QuizComponent = () => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [incorrectAnswerIndex, setIncorrectAnswerIndex] = useState(null);
  const [lastQuestion, setLastQuestion] = useState(null);
  const [showhint, setShowhint] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [hintsRemaining, setHintsRemaining] = useState(5);
  const [lastAttemptStatus, setLastAttemptStatus] = useState(null);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerId] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [shouldSkipDelay, setShouldSkipDelay] = useState(false);
  const [successMessages, setSuccessMessages] = useState([]);
  const [incorrectMessages, setIncorrectMessages] = useState([]);
  const [currentSuccessMessage, setCurrentSuccessMessage] = useState("");
  const [currentIncorrectMessage, setCurrentIncorrectMessage] = useState("");
  const [topUsers, setTopUsers] = useState([]);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  let currentUser;
  get(ref(db, "currentUser")).then((snapshot) => {
    if (snapshot.exists()) {
      currentUser = snapshot.val();
    }
  });

  const upperCaseCurrentUser = currentUser ? currentUser.toUpperCase() : null;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const {
      questions: initialQuestions,
      getSuccessMessages,
      getIncorrectMessages,
    } = QuizData(currentUser);

    const shuffledQuestions = shuffleArray([...initialQuestions]);
    setCurrentQuestion(0);
    setQuestions(shuffledQuestions);
    setSuccessMessages(getSuccessMessages()); // Call the function here
    setIncorrectMessages(getIncorrectMessages()); // Call the function here
  }, [currentUser]);

  useEffect(() => {
    let index = null;
    if (
      questions.length > 0 &&
      questions[currentQuestion] &&
      questions[currentQuestion].answers
    ) {
      index = questions[currentQuestion].answers.findIndex(
        (answer) => answer.correct === true
      );
    }
    setCorrectAnswerIndex(index);
  }, [questions, currentQuestion]);

  useEffect(() => {
    const scoresRef = ref(db, "scores");
    get(scoresRef).then((snapshot) => {
      if (snapshot.exists()) {
        const scoresData = snapshot.val();
        const sortedUsers = Object.values(scoresData)
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        setTopUsers(sortedUsers);
      }
    });
  }, []);

  const toggleLeaderboard = () => {
    setLeaderboardVisible(!leaderboardVisible);
  };

  const handleAnswerClick = (selectedAnswer) => {
    // Check if the selected answer is correct
    const isCorrect = questions[currentQuestion].answers.some(
      (answer) => answer.text === selectedAnswer && answer.correct
    );

    // Update attempts

    if (isCorrect) {
      const newScore = calculateScore(
        score,
        currentQuestion,
        questions,
        attempts + 1,
        timeLeft
      );

      setScore(newScore);

      const randomSuccessMessage = getRandomMessage(successMessages);

      setCurrentSuccessMessage(randomSuccessMessage);
      setLastAttemptStatus("success");
      // No need to set any index here
    } else {
      const randomIncorrectMessage = getRandomMessage(incorrectMessages);

      setCurrentIncorrectMessage(randomIncorrectMessage);
      const incorrectIndex = questions[currentQuestion].answers.findIndex(
        (answer) => answer.text === selectedAnswer
      );

      setAttempts(attempts + 1);
      setIncorrectAnswerIndex(incorrectIndex);
      setLastAttemptStatus("failure");
    }

    // On last attempt or correct answer, move to the next question
    if (attempts >= 2 || isCorrect) {
      pauseTimer();
      setShowCorrectAnswer(true);
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
        setLastAttemptStatus("success");
        if (attempts === 1) {
          setTimeout(() => {
            setCurrentQuestion(currentQuestion + 1); // Move to the next question
            setAttempts(0); // Reset the attempts
            resetTimer(); // Reset the timer
            setShowCorrectAnswer(false); // Hide the correct answer for the next question
            setCurrentSuccessMessage(""); // Reset success message
            setCurrentIncorrectMessage(""); // Reset incorrect message
            setLastAttemptStatus(null); // Reset the last attempt status
            setIncorrectAnswerIndex(null); // Reset the incorrect answer index
          }, 3000);
        }
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    }
  };

  const handleNextButton = () => {
    setLastAttemptStatus(null);
    setShowhint(false);
    setShouldSkipDelay(true);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowCorrectAnswer(false);
      setIncorrectAnswerIndex(null);
      setAttempts(1);
      resetTimer();
    } else {
      quizOver();
      resetTimer();
    }
  };
  //  adjust to keep last question state
  const handlePreviousButton = () => {
    setLastAttemptStatus(null);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleTimeout = () => {
    // Increment the count of incorrect answers
    setIncorrectAnswers(incorrectAnswers + 1);
    setIsTimerActive(false);
    setShowCorrectAnswer(true);

    // Reset the timer for the next question
    resetTimer();
  };

  const quizTimerValue = useQuizTimer(
    timeLeft,
    setTimeLeft,
    isTimerActive,
    setIsTimerActive,
    handleTimeout
  );
  const { startTimer, pauseTimer, resetTimer } = quizTimerValue;

  useEffect(() => {
    if (
      questions.length > 0 &&
      !isTimerActive &&
      !isPaused &&
      lastQuestion !== currentQuestion
    ) {
      const delay = shouldSkipDelay ? 0 : 3000;
      const timerId = setTimeout(() => {
        startTimer();
        setIsTimerActive(true);
        setLastQuestion(currentQuestion); // Update lastQuestion here
        setShouldSkipDelay(false); // Reset the flag
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [
    questions,
    isTimerActive,
    startTimer,
    isPaused,
    lastQuestion,
    currentQuestion,
    shouldSkipDelay,
  ]);

  // Backup variables to store messages when paused
  let backupSuccessMessage = "";
  let backupIncorrectMessage = "";

  const handlePauseClick = () => {
    // Store current messages in backup variables
    backupSuccessMessage = currentSuccessMessage;
    backupIncorrectMessage = currentIncorrectMessage;

    // Clear the messages
    setCurrentSuccessMessage("");
    setCurrentIncorrectMessage("");

    setIsPaused(true);
    pauseTimer();
  };

  const handleResumeClick = () => {
    // Restore the messages from backup variables
    setCurrentSuccessMessage(backupSuccessMessage);
    setCurrentIncorrectMessage(backupIncorrectMessage);

    setIsPaused(false);
    startTimer();
  };

  const PauseOverlay = ({ score, currentQuestion, totalQuestions }) => {
    const tips = [
      "Don't rush! Take your time like a quarterback scanning the field.",
      "Read the question twice, just like a referee double-checks a call.",
      "Stay focused. Keep your eye on the question like it's a flying football.",
      "Feeling stuck? Punt the hard questions for later and move on!",
      "Don't fumble on the easy questions. Make sure to read all options.",
      "Intercept your mistakes. Review your answers if you have time.",
      "Feeling nervous? Take a timeout to relax and breathe.",
      "Trust your gut feeling. Sometimes the first answer that comes to mind is the right one!",
      "Think you've scored a touchdown? Double-check your answers to make sure.",
      "Always finish strong, like the last quarter of a big game!",
    ];

    const getRandomTip = () => {
      if (tips.length === 0) return "No tips available.";

      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    };

    const tipToShow = getRandomTip();

    return (
      <div className="overlay">
        <h1>Quiz Paused</h1>
        <p id="p-user">
          Current User: <span id="styled-username">{upperCaseCurrentUser}</span>
        </p>
        <p id="p-score">Current Score: {score}</p>
        <p id="p-progress">
          Progress: {currentQuestion + 1} / {totalQuestions}
        </p>
        <div className="tip">
          <h2 id="tip-header">Tip</h2>
          <p id="p-tip">{tipToShow}</p>
        </div>
      </div>
    );
  };

  PauseOverlay.propTypes = {
    score: PropTypes.number.isRequired,
    currentQuestion: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    handleResumeClick: PropTypes.func.isRequired,
  };

  const quizOver = () => {
    setIsQuizOver(true);

    const scoresRef = ref(db, "scores");
    get(scoresRef).then((snapshot) => {
      let scoresData = [];
      if (snapshot.exists()) {
        scoresData = Object.values(snapshot.val());
      }
      scoresData.push({ name: upperCaseCurrentUser, score: score });
      scoresData = scoresData.sort((a, b) => b.score - a.score).slice(0, 5);
      set(scoresRef, scoresData);
    });
  };

  let finalMessage = "";

  if (incorrectAnswers === 0) {
    finalMessage = `Congratulations! You got all ${questions.length} questions correct!`;
  } else {
    finalMessage = `You got ${correctAnswers} questions correct and ${incorrectAnswers} incorrect.`;
  }

  const restartQuiz = () => {
    // Step 1: Reset the questions
    const { questions: initialQuestions } = QuizData();
    const shuffledQuestions = shuffleArray([...initialQuestions]);
    setQuestions(shuffledQuestions);
    setHintsRemaining(5);

    // Step 2: Reset the current question index
    setCurrentQuestion(0);

    // Step 3: Reset the score
    setScore(0);

    // Step 4: Reset the timer
    resetTimer();

    // Step 6: Reset quiz status if you have one
    setIsQuizOver(false);

    if (timerId) {
      clearTimeout(timerId);
    }

    // Step 8: Any other state or side-effects to clear
    // ...
  };
  const hintHandler = () => {
    if (hintsRemaining > 0) {
      // Decrement the hints remaining
      setHintsRemaining(hintsRemaining - 1);
      setShowhint(true);
    }
  };

  return (
    <section className="quiz-container">
      <header>
        <div id="current-score"></div>
        <div className="leaderboard-container">
          <button id="leaderboard-toggle" onClick={toggleLeaderboard}>
            Leaderboard
            {leaderboardVisible ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </button>

          {topUsers.length >= 2 && leaderboardVisible && (
            <LeaderboardComponent users={topUsers} />
          )}
        </div>
        <h1 id="quiz-title">Raven&rsquo;s Gridiron Quiz!</h1>
      </header>
      {isQuizOver && (
        <div className="quiz-over">
          <div id="final-score">Your final score: {score}</div>
          <div id="final-message">{finalMessage}</div>
        </div>
      )}

      {isPaused && (
        <PauseOverlay
          score={score}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          handleResumeClick={handleResumeClick}
        />
      )}

      {!isQuizOver ? (
        <>
          <div className="images">
            <img
              id="football-png"
              className="desktop"
              src="https://media.discordapp.net/attachments/1083626681404760064/1149078317178310786/5-74-removebg-preview_1.png?width=406&height=570"
              alt="quiz"
            />
            <img
              id="whistle"
              className="desktop"
              src="https://media.discordapp.net/attachments/1083626681404760064/1144504617024106656/whistle-sport-computer-icons-clip-art-png-favpng-vUbFb6B4mdADdHseVU7VhBW2K-removebg-preview.png"
              alt="quiz"
            />
          </div>
          {questions.length > 0 && !isPaused ? (
            <>
              <QuestionElement
                question={questions[currentQuestion]?.question || "Loading..."}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
              />

              {timeLeft <= 15 && (
                <span
                  onClick={() => {
                    hintHandler();
                  }}
                  id="hint-btn"
                >
                  <i className="fa-solid fa-lightbulb"></i>
                </span>
              )}

              {showhint && (
                <div id="hint">
                  <button
                    className="ins-close-button"
                    onClick={() => setShowhint(false)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <h2 id="hint-header">Hint</h2>
                  <p id="hints-remaining">Hints Remaining: {hintsRemaining}</p>
                  <p>{questions[currentQuestion].hint}</p>
                </div>
              )}

              <AnswerButtonsElement
                answers={questions[currentQuestion].answers.map(
                  (answerObj) => answerObj.text
                )}
                currentQuestionData={questions[currentQuestion]}
                handleAnswerClick={handleAnswerClick}
                showCorrectAnswer={showCorrectAnswer}
                setShowCorrectAnswer={setShowCorrectAnswer}
                correctAnswerIndex={correctAnswerIndex}
                incorrectAnswerIndex={incorrectAnswerIndex}
              />

              <div id="current-score">
                <span id="styled-username">{upperCaseCurrentUser}</span>:{" "}
                {score}
              </div>
            </>
          ) : null}
          {!isPaused ? (
            <nav className="controls">
              <button
                className="control-btn"
                id="previous"
                onClick={handlePreviousButton}
              >
                Previous
              </button>
              <button
                className={`control-btn ${showCorrectAnswer ? "blink" : ""}`}
                id="next"
                onClick={handleNextButton}
              >
                Next
              </button>
            </nav>
          ) : null}
          <button
            id="pause-btn"
            onClick={isPaused ? handleResumeClick : handlePauseClick}
          >
            {isPaused ? (
              <i className="fa-solid fa-play"></i>
            ) : (
              <i className="fa-solid fa-pause"></i>
            )}
          </button>

          <aside>
            {lastAttemptStatus === "success" && (
              <div id="correct-answer-message">{currentSuccessMessage}</div>
            )}
            {lastAttemptStatus === "failure" && (
              <div id="incorrect-answer-message">{currentIncorrectMessage}</div>
            )}
            <div id="timer-container">
              <span id="timer" className={timeLeft <= 10 ? "low-time" : ""}>
                {timeLeft}
              </span>
            </div>
          </aside>
        </>
      ) : (
        <>
          <footer>
            <div id="restart-btn" onClick={restartQuiz}>
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </div>
          </footer>
        </>
      )}
    </section>
  );
};
