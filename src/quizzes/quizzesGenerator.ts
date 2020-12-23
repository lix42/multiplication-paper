export type Num = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const minNum = 2;
const maxNum = 12;

export type Quiz = {
  readonly first: Num;
  readonly second: Num;
};

const isNum = (n?: number): n is Num =>
  n != null && Number.isFinite(n) && n >= minNum && n <= maxNum;

const frequency: { [key in Num]: number } = {
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 2,
  9: 2,
  10: 1,
  11: 1,
  12: 1,
};
export const generateAllQuizzes = (): Quiz[] => {
  let result: Quiz[] = [];
  for (let first = minNum; first <= maxNum; first++) {
    for (let second = minNum; second <= first; second++) {
      if (isNum(first) && isNum(second)) {
        for (let i = 0; i < frequency[first] * frequency[second]; i++) {
          result.push({ first, second });
        }
      }
    }
  }
  return result;
};

export const pickQuizzes = (candidates: Quiz[], count: number): Quiz[] => {
  let candidatesLength = candidates.length;
  return candidates.reduce((accu: Quiz[], quiz, index) => {
    const candidateCount = candidatesLength - index;
    const resultLeft = count - accu.length;
    if (Math.random() * candidateCount < resultLeft) {
      accu.push(quiz);
    }
    return accu;
  }, []);
};

export const randomSortQuiz = (quiz: Quiz): Quiz =>
  Math.random() * 2 > 1
    ? quiz
    : {
        first: quiz.second,
        second: quiz.first,
      };
