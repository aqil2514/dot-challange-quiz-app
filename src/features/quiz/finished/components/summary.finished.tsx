import { ItemHorizontal } from "@/components/molecules/item-horizontal";
import { useQuizStore } from "@/store/quiz/quiz.store";

export function FinishedSummary() {
  const { quiz, progress } = useQuizStore();

  if (!progress) throw new Error("Progress tidak ditemukan");
  const answers = progress.answer;

  const correctedAnswer = quiz.filter((quiz) => {
    const correct = answers[quiz.quizId] === quiz.correct_answer;

    return correct;
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <ItemHorizontal label="Jumlah Soal" value={`${quiz.length} Soal`} />
      <ItemHorizontal
        label="Jawaban Benar"
        value={`${correctedAnswer.length} Soal`}
      />
      <ItemHorizontal
        label="Jawaban Salah"
        value={`${quiz.length - correctedAnswer.length} Soal`}
      />
      <ItemHorizontal
        label="Jumlah Jawab"
        value={`${Object.keys(answers).length} Soal`}
      />
    </div>
  );
}
