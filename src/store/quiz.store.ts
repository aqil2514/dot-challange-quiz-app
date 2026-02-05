import type { QuestConfigSchemaType } from "@/features/menu/schema/quest-config.schema";
import type { QuizItem } from "@/features/menu/types/quiz-api-result.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface QuizStoreMetaTypes {
  config: QuestConfigSchemaType | null;
}

interface QuizStoreState {
  meta: QuizStoreMetaTypes;
  quiz: QuizItem[];
}

interface QuizStoreAction {
  updateQuiz: (quiz: QuizItem[]) => void;
  updateMeta: <T extends keyof QuizStoreMetaTypes>(
    key: T,
    value: QuizStoreMetaTypes[T],
  ) => void;

  resetQuiz: () => void;
  resetMeta: () => void;
}

type QuizStore = QuizStoreState & QuizStoreAction;

const defaultMeta: QuizStoreMetaTypes = {
  config: null,
};

const createQuizState = (): QuizStoreState => {
  return {
    meta: {
      config: null,
    },
    quiz: [],
  };
};

const createQuizAction = (
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

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...createQuizState(),
      ...createQuizAction(set, get),
    }),
    {
      name: "quiz-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
