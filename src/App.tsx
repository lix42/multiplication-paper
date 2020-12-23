import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { prepareQuizzes } from "./quizzes/quizzesGenerator";

const INITIAL_COUNT = 26;
function App() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [quizzes, setQuizzes] = useState(() => prepareQuizzes(count));
  return (
    <div className="container">
      <div className="controller-bar">
        <label>
          How many questions?
          <input
            className="count-input"
            type="number"
            value={count}
            min={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newCount = parseInt(e.target.value);
              setCount(newCount);
              setQuizzes(prepareQuizzes(newCount));
            }}
          />
        </label>
        <button type="button" onClick={() => setQuizzes(prepareQuizzes(count))}>
          Refresh
        </button>
      </div>
      <div className="quizzes-container">
        {quizzes.map((quiz) => (
          <span className="quiz">
            {quiz.first} X {quiz.second} =
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
