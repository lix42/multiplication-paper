import React, { FC, ReactElement } from "react";
import { Quiz } from "./quizzes/quizzesGenerator";
import "./App.css";

interface PageProp {
  readonly pageIndex: number;
  readonly count: number;
  readonly quizzes: Quiz[];
}

export const Page: FC<PageProp> = ({ pageIndex, count, quizzes }) => {
  const quizElements: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const index = pageIndex * count + i;
    if (index >= quizzes.length) {
      break;
    }
    const quiz = quizzes[index];
    quizElements.push(
      <span className="quiz">
        {Math.random() > 0.4
          ? `${quiz.first} X ${quiz.second} =`
          : `${quiz.first * quiz.second} ÷ ${quiz.first} =`}
      </span>
    );
  }
  return <div className="quiz-page">{quizElements}</div>;
};
