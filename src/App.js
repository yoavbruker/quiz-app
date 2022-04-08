import logo from "./logo.svg";
import "./App.css";
import Question from "./components/question/question";
import React, { useEffect, useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    const getAllQuestions = async () => {
      console.log("hello");
      try {
        const questionsApiResponse = await fetch(
          "https://opentdb.com/api.php?amount=100"
        );
        console.log(questionsApiResponse);
        const allQuestionsResponseJson = await questionsApiResponse.json();
        console.log(allQuestionsResponseJson);
        setAllQuestions(allQuestionsResponseJson.results);
      } catch (error) {
        console.log(error);
      }
    };

    getAllQuestions();
  }, [setAllQuestions]);

  const result = allQuestions[currentQuestion];

  return (
    <div className="App">
      <Question
        question={result?.question}
        rightAnswer={result?.correct_answer}
        wrongAnswers={result?.incorrect_answers}
      />
    </div>
  );
}

export default App;
