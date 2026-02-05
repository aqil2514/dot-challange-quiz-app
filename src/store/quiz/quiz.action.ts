import type {
  QuizStore,
  QuizStoreAction,
  QuizStoreState,
} from "./quiz.interface";
import { defaultMeta } from "./quiz.state";

export const createQuizAction = (
  set: (partial: Partial<QuizStoreState>) => void,
  get: () => QuizStore,
): QuizStoreAction => {
  return {
    updateMeta: (key, value) =>
      set({
        meta: {
          ...get().meta,
          [key]: value,
        },
      }),
    updateQuiz: (quiz) => set({ quiz }),

    resetMeta: () => set({ meta: defaultMeta }),
    resetQuiz: () => set({ quiz: [] }),
  };
};
