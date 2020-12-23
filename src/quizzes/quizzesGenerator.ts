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
  2: 4,
  3: 6,
  4: 6,
  5: 4,
  6: 8,
  7: 8,
  8: 8,
  9: 8,
  10: 1,
  11: 3,
  12: 3,
};

export const generateAllQuizzes = (count = 1): Quiz[] => {
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
  while (result.length < count) {
    result = [...result, ...result];
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
  const picked = pickQuizzes(candidates, count);
  const shuffled = shuffleQuizzes(picked);
  return shuffled.map(shakeQuiz);
};
