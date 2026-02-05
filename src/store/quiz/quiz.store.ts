import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { QuizStore } from "./quiz.interface";
import { createQuizAction } from "./quiz.action";
import { createQuizState } from "./quiz.state";

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
