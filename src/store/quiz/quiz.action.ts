/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  QuizStore,
  QuizStoreAction,
  QuizStoreState,
} from "./quiz.interface";
import { defaultMeta } from "./quiz.state";

export const createQuizAction = (
  set: (fn: (state: QuizStoreState) => Partial<QuizStoreState>) => void,
  _get: () => QuizStore,
): QuizStoreAction => {
  return {
    updateMeta: (key, value) =>
      set((state) => ({
        meta: {
          ...state.meta,
          [key]: value,
        },
      })),
    updateQuiz: (quiz) => set(() => ({ quiz })),

    resetMeta: () => set(() => ({ meta: defaultMeta })),
    resetQuiz: () => set(() => ({ quiz: [] })),

    playQuiz: () =>
      set(() => {
        return { progress: { answer: {}, currentIndex: 0 } };
      }),
    nextQuiz: () =>
      set((state) => {
        if (!state.progress) return { progress: null };
        const nextIndex = state.progress.currentIndex + 1;

        return {
          progress: { ...state.progress, currentIndex: nextIndex },
        };
      }),
    clearProgress: () => set(() => ({ progress: null })),
    saveAnswer: (questId, answer) =>
      set((state) => {
        if (!state.progress) return { progress: null };

        return {
          progress: {
            ...state.progress,
            answer: {
              ...state.progress.answer,
              [questId]: answer,
            },
          },
        };
      }),
  };
};
