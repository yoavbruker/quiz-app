import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import Question from "../question/question";
import "./question-game-panel.css";
import QuestionGameStats from "../question-game-stats/question-game-stats";

const INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS = 60000;

const QuestionGamePanel = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [timeLeftInMilliseconds, setTimeLeftInMilliseconds] = useState(
    INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS
  );

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

    getAllQuestions();
  }, [setAllQuestions]);

  useEffect(() => {
    if (timerInterval.current === null) {
      timerInterval.current = setInterval(() => {
        setTimeLeftInMilliseconds((prevTime) => prevTime - 200);
      }, 200);
    }
  }, [timerInterval, setTimeLeftInMilliseconds]);

  useEffect(() => {
    if (timeLeftInMilliseconds === 0) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, [timeLeftInMilliseconds]);

  const moveToNextQuestion = () => {
    setCurrentQuestion((prevQuestionIndex) => prevQuestionIndex + 1);
    setTimeLeftInMilliseconds(INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS);
  };

  const onRightAnswerClicked = () => {
    setScore((prevScore) => prevScore + 10);
    moveToNextQuestion();
  };

  const onWrongAnswerClicked = () => {
    moveToNextQuestion();
  };

  const currentQuestionObject = allQuestions[currentQuestion];

  const timeLeftPrecentage =
    (timeLeftInMilliseconds / INITIAL_TIME_PER_QUESTION_IN_MILLISECONDS) * 100;

  return (
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
  );
};

export default QuestionGamePanel;
