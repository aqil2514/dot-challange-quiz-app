import { useQuizStore } from "@/store/quiz/quiz.store";
import he from "he";

export function QuizQuestion() {
  const { quiz, progress } = useQuizStore();

  if (!progress) throw new Error("Progress tidak ditemukan");
  const currentQuiz = quiz[progress.currentIndex];

  return (
    <div className="h-20">
      <p className="text-center text-2xl font-semibold">{he.decode(currentQuiz.question)}</p>
    </div>
  );
}
