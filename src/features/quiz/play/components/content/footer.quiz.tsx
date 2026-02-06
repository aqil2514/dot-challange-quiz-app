import { useQuizStore } from "@/store/quiz/quiz.store";

export function QuizFooter() {
  const { progress, quiz } = useQuizStore();
  if (!progress) throw new Error("Progress tidak ditemukan");
  const currentIndex = progress.currentIndex;

  return (
    <div>
      <p className="font-semibold text-xl text-center">
        {currentIndex + 1}/{quiz.length}
      </p>
    </div>
  );
}
