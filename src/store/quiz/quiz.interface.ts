import type { QuestConfigSchemaType } from "@/features/quiz/menu/schema/quest-config.schema";
import type { QuizItem } from "@/features/quiz/menu/types/quiz-api-result.types";

export type QuizStatus = "idle" | "play" | "pause" | "finished";

export interface QuizStoreMetaTypes {
  config: QuestConfigSchemaType | null;
  quizStatus: QuizStatus;
}

export interface QuizStoreState {
  meta: QuizStoreMetaTypes;
  quiz: QuizItem[];
}

export interface QuizStoreAction {
  updateQuiz: (quiz: QuizItem[]) => void;
  updateMeta: <T extends keyof QuizStoreMetaTypes>(
    key: T,
    value: QuizStoreMetaTypes[T],
  ) => void;

  resetQuiz: () => void;
  resetMeta: () => void;
}

export type QuizStore = QuizStoreState & QuizStoreAction;
