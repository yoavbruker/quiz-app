import React, { useMemo } from "react";
import { Button, Grid } from "@mui/material";
import "./question.css";

const decodeHtmlString = (strToDecode) => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${strToDecode}`,
    "text/html"
  ).body.textContent;

  return decodedString;
};

const Question = ({
  question,
  rightAnswer,
  wrongAnswers,
  onRightAnswerClicked,
  onWrongAnswerClicked,
}) => {
  const shuffledAnswers = useMemo(
    () =>
      [rightAnswer, ...wrongAnswers]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    [rightAnswer, wrongAnswers]
  );

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      className="questionContainer"
    >
      <Grid item>
        <h3>{decodeHtmlString(question)}</h3>
      </Grid>
      <Grid item>
        <Grid container justifyContent="space-around">
          {shuffledAnswers.map((answer, answerIndex) => (
            <Grid item xs={6} key={answerIndex}>
              <Button
                variant="contained"
                onClick={
                  answer === rightAnswer
                    ? onRightAnswerClicked
                    : onWrongAnswerClicked
                }
                className="answerButton"
              >
                {decodeHtmlString(answer)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
