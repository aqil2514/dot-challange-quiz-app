import type { QuestConfigSchemaType } from "@/features/quiz/menu/schema/quest-config.schema";
import type { QuizItemWithId } from "@/features/quiz/menu/types/quiz-api-result.types";

export type QuizStatus = "idle" | "play" | "pause" | "finished";

export interface QuizStoreMetaTypes {
  config: QuestConfigSchemaType | null;
  quizStatus: QuizStatus;
}

export interface QuizProgressTypes {
  currentIndex: number;
  answer: Record<string, string>;
}

export interface QuizStoreState {
  meta: QuizStoreMetaTypes;
  quiz: QuizItemWithId[];
  progress: QuizProgressTypes | null;
}

export interface QuizStoreAction {
  updateQuiz: (quiz: QuizItemWithId[]) => void;
  updateMeta: <T extends keyof QuizStoreMetaTypes>(
    key: T,
    value: QuizStoreMetaTypes[T],
  ) => void;

  resetQuiz: () => void;
  resetMeta: () => void;

  // Progress
  playQuiz: () => void;
  nextQuiz: () => void;
  saveAnswer: (questId: string, answer: string) => void;
  clearProgress: () => void;
}

export type QuizStore = QuizStoreState & QuizStoreAction;
