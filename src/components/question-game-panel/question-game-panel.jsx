import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import Question from "../question/question";
import QuestionGameStats from "../question-game-stats/question-game-stats";
import GameSummery from "../game-summery/game-summery";
import "./question-game-panel.css";

const INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS = 60000;

const QuestionGamePanel = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(
    INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS
  );
  const [isGameOver, setIsGameOver] = useState(false);

  const timerInterval = useRef(null);

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const questionsApiResponse = await fetch(
          "https://opentdb.com/api.php?amount=100"
        );
        const allQuestionsResponseJson = await questionsApiResponse.json();

        setAllQuestions(allQuestionsResponseJson.results);
      } catch (error) {
        console.log(error);
      }
    };
    if (!isGameOver) {
      getAllQuestions();
    }
  }, [isGameOver, setAllQuestions]);

  useEffect(() => {
    const setTimerInterval = () => {
      if (timerInterval !== null) {
        clearInterval(timerInterval);
      }

      timerInterval.current = setInterval(() => {
        setTimeLeftInMilliseconds((prevTime) => prevTime - 200);
      }, 200);
    };

    if (!isGameOver) {
      setTimerInterval();
    }
  }, [isGameOver]);

  useEffect(() => {
    if (timeLeftInMilliseconds === 0 || isGameOver) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;

      if (timeLeftInMilliseconds === 0) {
        setIsGameOver(true);
      }
    }
  }, [timeLeftInMilliseconds, isGameOver, setIsGameOver]);

  const moveToNextQuestion = () => {
    setCurrentQuestion((prevQuestionIndex) => prevQuestionIndex + 1);
    setTimeLeftInMilliseconds(INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS);
  };

  const onRightAnswerClicked = () => {
    setScore((prevScore) => prevScore + 10);
    moveToNextQuestion();
  };

  const onWrongAnswerClicked = () => {
    setIsGameOver(true);
  };

  const onRetryClicked = () => {
    setTimeLeftInMilliseconds(INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS);
    setIsGameOver(false);
    setScore(0);
  };

  const currentQuestionObject = allQuestions[currentQuestion];

  const timeLeftPrecentage =
    (timeLeftInMilliseconds / INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS) * 100;

  return (
    <>
      {!isGameOver ? (
        <Grid container className="gamePanel">
          <Grid item xs={9}>
            {currentQuestionObject ? (
              <Question
                question={currentQuestionObject.question}
                rightAnswer={currentQuestionObject.correct_answer}
                wrongAnswers={currentQuestionObject.incorrect_answers}
                onRightAnswerClicked={onRightAnswerClicked}
                onWrongAnswerClicked={onWrongAnswerClicked}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item xs={3}>
            <QuestionGameStats
              score={score}
              timeLeftPrecentage={timeLeftPrecentage}
              actualTimeLeft={timeLeftInMilliseconds / 1000}
            />
          </Grid>
        </Grid>
      ) : (
        <GameSummery score={score} onRetryClicked={onRetryClicked} />
      )}
    </>
  );
};

export default QuestionGamePanel;
