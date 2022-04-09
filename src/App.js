import React from "react";
import QuestionGamePanel from "./components/question-game-panel/question-game-panel";
import { AppBar, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h6" color="inherit" component="div">
          Yoav's Quiz App
        </Typography>
      </AppBar>
      <QuestionGamePanel />
    </div>
  );
};

export default App;
