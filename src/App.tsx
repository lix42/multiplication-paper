import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { prepareQuizzes } from "./quizzes/quizzesGenerator";
import "./App.css";
import { Page } from "./Page";

const INITIAL_COUNT = 32;
function App() {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [pages, setPages] = useState(40);
  const [quizzes, setQuizzes] = useState(() => prepareQuizzes(count));
  const updateQuizzes = useCallback(() => {
    const totalCount = count * pages;
    setQuizzes(prepareQuizzes(totalCount));
  }, [count, pages]);
  useEffect(() => updateQuizzes(), [pages, count, updateQuizzes]);
  return (
    <div className="container">
      <div className="controller-bar">
        <label>
          How many questions per page?
          <input
            className="count-input"
            type="number"
            value={count}
            min={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newCount = parseInt(e.target.value) || 4;
              setCount(newCount);
            }}
          />
        </label>
        <label>
          How many pages?
          <input
            className="count-input"
            type="number"
            value={pages}
            min={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const newPages = parseInt(e.target.value) || 1;
              setPages(newPages);
            }}
          />
        </label>
        <button type="button" onClick={updateQuizzes}>
          Refresh
        </button>
      </div>
      <div className="quizzes-container">
        {Array.from({ length: pages }, (_, index) => (
          <Page pageIndex={index} count={count} quizzes={quizzes} />
        ))}
      </div>
    </div>
  );
}

export default App;
