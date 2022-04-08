import React from "react";
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
          <Grid item>
            <Button variant="contained" onClick={onRightAnswerClicked}>
              {decodeHtmlString(rightAnswer)}
            </Button>
          </Grid>
          {wrongAnswers.map((wrongAnswer, wrongAnswerIndex) => (
            <Grid item key={wrongAnswerIndex}>
              <Button variant="contained" onClick={onWrongAnswerClicked}>
                {decodeHtmlString(wrongAnswer)}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
