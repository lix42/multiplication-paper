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
  3: 2,
  4: 2,
  5: 3,
  6: 6,
  7: 6,
  8: 6,
  9: 3,
  10: 0,
  11: 3,
  12: 3,
};
const threshold = 1;

export const generateAllQuizzes = (count = 1): Quiz[] => {
  let result: Quiz[] = [];
  let num = 0;
  for (let first = minNum; first <= maxNum; first++) {
    for (let second = minNum; second <= first; second++) {
      if (
        isNum(first) &&
        isNum(second) &&
        isNum(frequency[first]) &&
        isNum(frequency[second])
      ) {
        const repeat = frequency[first] * frequency[second] - threshold;
        if (repeat > 0) {
          num++;
          for (let i = 0; i < repeat; i++) {
            result.push({ first, second });
          }
        }
      }
    }
  }
  while (num < count * 2) {
    result = [...result, ...result];
    num += num;
  }
  return result;
};

export const pickQuizzes = (candidates: Quiz[], count: number): Quiz[] => {
  let candidatesLength = candidates.length;
  const temp = candidates.reduce((accu: Quiz[], quiz, index) => {
    const candidateCount = candidatesLength - index;
    const resultLeft = count - accu.length;
    if (Math.random() * candidateCount > resultLeft) {
      return accu;
    }
    if (accu.length > 0) {
      const lastQuiz = accu[accu.length - 1];
      if (quiz.first === lastQuiz.first && quiz.second === lastQuiz.second) {
        return accu;
      }
    }
    accu.push(quiz);
    return accu;
  }, []);
  if (temp.length < count) {
    return [...temp, ...pickQuizzes(candidates, count - temp.length)];
  }
  return temp;
};

export const shuffleQuizzes = (quizzes: Quiz[]): Quiz[] => {
  const scope = quizzes.length * 100;
  return quizzes
    .map((quiz) => ({ ...quiz, order: Math.random() * scope }))
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...quiz }) => quiz);
};

export const shakeQuiz = (quiz: Quiz): Quiz =>
  Math.random() * 2 > 1
    ? quiz
    : {
        first: quiz.second,
        second: quiz.first,
      };

export const prepareQuizzes = (count: number) => {
  const candidates = generateAllQuizzes(count);
  const shuffled = shuffleQuizzes(candidates);
  const picked = pickQuizzes(shuffled, count);
  return picked.map(shakeQuiz);
};
