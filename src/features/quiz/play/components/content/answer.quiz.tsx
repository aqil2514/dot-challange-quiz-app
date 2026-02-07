import { Button } from "@/components/ui/button";
import { shuffleArray } from "@/lib/utils";
import { useQuizStore } from "@/store/quiz/quiz.store";
import he from "he";
import { useMemo } from "react";
import { toast } from "sonner";

export function QuizAnswer() {
  const { quiz, progress, nextQuiz, saveAnswer, updateMeta } = useQuizStore();

  if (!progress) throw new Error("Progress tidak ditemukan");
  const currentQuiz = quiz[progress.currentIndex];

  const answers = useMemo(() => {
    return shuffleArray([
      ...currentQuiz.incorrect_answers,
      currentQuiz.correct_answer,
    ]);
  }, [currentQuiz]);

  const handleAnswer = (quizId: string, answer: string) => {
    const currentIndex = progress.currentIndex + 1;
    if (currentIndex !== quiz.length) {
      saveAnswer(quizId, answer);
      nextQuiz();
      return;
    }

    saveAnswer(quizId, answer);
    updateMeta("quizStatus", "finished");
    toast.success("Kuis berhasil diselesaikan!");
  };

  return (
    <div className="grid grid-cols-2 gap-x-20 gap-y-8">
      {answers.map((answer, i) => (
        <Button
          key={`answer-${i}`}
          variant={"outline"}
          onClick={() => handleAnswer(currentQuiz.quizId, answer)}
        >
          {he.decode(answer)}
        </Button>
      ))}
    </div>
  );
}
