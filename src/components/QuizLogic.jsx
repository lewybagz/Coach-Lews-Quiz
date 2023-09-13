import { useEffect } from "react";

export function useQuizTimer(
  timeLeft,
  setTimeLeft,
  isTimerActive,
  setIsTimerActive,
  handleTimeout,
  isPaused
) {
  const startTimer = () => {
    setIsTimerActive(true);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setTimeLeft(30);
  };

  useEffect(() => {
    let timerId;

    if (isTimerActive && !isPaused) {
      // Check if timer is active and the quiz is not paused
      if (timeLeft > 0) {
        timerId = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
      } else {
        setIsTimerActive(false);
        handleTimeout(); // Call handleTimeout function when time runs out
      }
    }

    return () => clearTimeout(timerId); // Cleanup
  }, [
    timeLeft,
    isTimerActive,
    setTimeLeft,
    setIsTimerActive,
    handleTimeout,
    isPaused,
  ]);
  // Return the methods so they can be used outside this hook
  return {
    startTimer,
    pauseTimer,
    resetTimer,
  };
}

// Function to shuffle an array (useful for shuffling questions)
export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Function to select a random message
export const getRandomMessage = (messagesArray) => {
  console.log("messagesArray in getRandomMessage:", messagesArray); // New log
  // Implementation to pick a random message
  const arrayLength = messagesArray.length;
  const randomIndex = Math.floor(Math.random() * arrayLength);

  return messagesArray[randomIndex];
};

export const calculateScore = (
  score,
  currentQuestion,
  questions,
  attempts,
  timeLeft
) => {
  const timeFactor = Math.max(0, timeLeft) / 5;
  // Base score per question
  const baseScore = 100 / questions.length;

  // Double the base score for 2nd attempt
  const secondAttemptScore = 50 / questions.length;

  const adjustedBaseScore = baseScore * timeFactor;
  const adjustedSecondAttemptScore = secondAttemptScore * timeFactor;

  // Check if the answer is correct
  const isCorrect = questions[currentQuestion].answers.some(
    (answer) => answer.correct
  );

  // Calculate new score based on number of attempts
  const newScore = isCorrect
    ? attempts === 1
      ? score + Math.ceil(adjustedBaseScore)
      : score + Math.ceil(adjustedSecondAttemptScore)
    : score;

  return newScore;
};
