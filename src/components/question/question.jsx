import React from "react";
import { Button, Grid } from "@mui/material";
import "./question.css";

const Question = ({
  question,
  rightAnswer,
  wrongAnswers,
  onRightAnswerClicked,
  onWrongAnswerClicked,
}) => {
  return (
    <Grid container direction="column" justifyContent="space-around">
      <Grid item>
        <h3>{question}</h3>
      </Grid>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button variant="contained" onClick={onRightAnswerClicked}>
              {rightAnswer}
            </Button>
          </Grid>
          {wrongAnswers.map((wrongAnswer, wrongAnswerIndex) => (
            <Grid item key={wrongAnswerIndex}>
              <Button variant="contained" onClick={onWrongAnswerClicked}>
                {wrongAnswer}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
