import type { QuestConfigSchemaType } from "../schema/quest-config.schema";

export interface QuizApiResult {
  response_code: number;
  results: QuizItem[];
}

export interface QuizItem {
  category: string;
  correct_answer: string;
  difficulty: QuestConfigSchemaType["difficulty"];
  incorrect_answers: string[];
  question: string;
  type: QuestConfigSchemaType["type"];
}

export interface QuizItemWithId extends QuizItem {
  quizId: string;
}
