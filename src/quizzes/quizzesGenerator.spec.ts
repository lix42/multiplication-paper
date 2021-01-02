import {
  generateAllQuizzes,
  pickQuizzes,
  prepareQuizzes,
  Quiz,
} from "./quizzesGenerator";

describe("generateAllQuizzes", () => {
  it("should generate quizzes more than required count", () => {
    const all = generateAllQuizzes(128);
    expect(all.length).not.toBeLessThan(128);
  });
});

describe("pickQuizzes", () => {
  const candidates: Quiz[] = [
    {
      first: 2,
      second: 2,
    },
    {
      first: 3,
      second: 3,
    },
    {
      first: 4,
      second: 4,
    },
  ];
  it("should return an empty array if target count is 0", () => {
    const result = pickQuizzes(candidates, 0);
    expect(result).toEqual([]);
  });
  it("should return random quizzes", () => {
    for (let i = 1; i <= 3; i++) {
      const result = pickQuizzes(candidates, i);
      expect(result).toHaveLength(i);
      const set = new Set(result);
      expect(set.size).toBe(i);
    }
  });
  it("should return the quizzes of required count", () => {
    const result = pickQuizzes(generateAllQuizzes(64), 64);
    expect(result).toHaveLength(64);
  });
});

describe("prepareQuizzes", () => {
  it("should return the quizzes of required count", () => {
    const result = prepareQuizzes(128);
    expect(result).toHaveLength(128);
  });
});
