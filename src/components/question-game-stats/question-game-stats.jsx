import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import "./question-game-stats.css";

const QuestionGameStats = ({ score, timeLeftPrecentage, actualTimeLeft }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      className="statsContainer"
    >
      <Grid item>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <span className="scoreLabel">{score}</span>
          </Grid>
          <Grid item>
            <WorkspacePremiumIcon />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" justifyContent="center">
          <CircularProgress variant="determinate" value={timeLeftPrecentage} />
          <span>{Math.round(actualTimeLeft)}</span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionGameStats;
