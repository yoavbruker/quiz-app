import React from "react";
import { Button } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import "./game-summery.css";

const GameSummery = ({ score, onRetryClicked }) => {
  return (
    <div className="summeryPanel">
      <div className="scorePanel">
        <span>{score}</span>
        <WorkspacePremiumIcon color="primary" />
      </div>
      <Button variant="contained" onClick={onRetryClicked}>
        retry
      </Button>
    </div>
  );
};

export default GameSummery;
