import type { QuizStoreMetaTypes, QuizStoreState } from "./quiz.interface";

export const defaultMeta: QuizStoreMetaTypes = {
  config: null,
  quizStatus: "idle",
};

export const createQuizState = (): QuizStoreState => {
  return {
    meta: defaultMeta,
    quiz: [],
  };
};
