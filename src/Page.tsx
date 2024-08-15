import React, { FC, ReactElement } from "react";
import { Quiz } from "./quizzes/quizzesGenerator";
import "./App.css";

interface PageProp {
  readonly pageIndex: number;
  readonly count: number;
  readonly quizzes: Quiz[];
}

const getQuestion = ({ first, second }: Quiz): string => {
  // const random = Math.floor(Math.random() * (2 + 2 + 6 + 4));
  // const random = Math.floor(Math.random() * (6 + 4));
  // const random = Math.floor(Math.random() * (6 + 2 + 2 + 1));
  // if (random < 2) {
  //   return `${first} + ${second} =`;
  // }
  // if (random < 2 + 1 && first !== second) {
  //   return `${Math.max(first, second)} - ${Math.min(first, second)} =`;
  // }
  // if (random < 2 + 2) {
  //   return `${first + second} - ${first} =`;
  // }
  // if (random < 6) {
  //   return `${first} X ${second} =`;
  // } else {
  //   return `${first * second} ÷ ${first} =`;
  // }
  // if (random < 6) {
  //   return `${first} + ${second} =`;
  // }
  // if (random < 6 + 2 && first !== second) {
  //   return `${Math.max(first, second)} - ${Math.min(first, second)} =`;
  // }
  // if (random < 6 + 2 + 2) {
  //   return `${first + second} - ${first} =`;
  // }
  return `${first} X ${second} =`;
};

export const Page: FC<PageProp> = ({ pageIndex, count, quizzes }) => {
  const quizElements: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const index = pageIndex * count + i;
    if (index >= quizzes.length) {
      break;
    }
    const quiz = quizzes[index];
    quizElements.push(<span className="quiz">{getQuestion(quiz)}</span>);
  }
  return <div className="quiz-page">{quizElements}</div>;
};
