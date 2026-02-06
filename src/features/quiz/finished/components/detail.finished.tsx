import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuizStore } from "@/store/quiz/quiz.store";
import he from "he";
import clsx from "clsx";

export function FinishedDetail() {
  const { quiz, progress } = useQuizStore();

  if (!progress) throw new Error("Progress tidak ditemukan");

  return (
    <ScrollArea className="h-52 py-1">
      <div className="space-y-4">
        {quiz.map((q, index) => {
          const answers = [...q.incorrect_answers, q.correct_answer];
          const yourAnswer = progress.answer[q.quizId];
          const isLast = index === quiz.length - 1;

          return (
            <div key={q.quizId} className="px-6">
              <p className="font-semibold text-lg">Soal {index + 1}</p>
              <p className="mb-2">{he.decode(q.question)}</p>

              <p className="font-semibold">Pilihan Ganda</p>
              <ul className="list-decimal pl-6 space-y-1">
                {answers.map((a) => {
                  const isCorrectAnswer = a === q.correct_answer;
                  const isYourAnswer = a === yourAnswer;

                  return (
                    <li
                      key={`${q.quizId}-${a}`}
                      className={clsx(
                        "rounded px-2 py-1",
                        {
                          "bg-green-100 text-green-800":
                            isCorrectAnswer,
                          "bg-red-100 text-red-800":
                            isYourAnswer && !isCorrectAnswer,
                        }
                      )}
                    >
                      {he.decode(a)}

                      {isCorrectAnswer && (
                        <span className="ml-2 text-sm font-semibold">
                          (Jawaban Benar)
                        </span>
                      )}

                      {isYourAnswer && !isCorrectAnswer && (
                        <span className="ml-2 text-sm font-semibold">
                          (Jawaban Kamu)
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {!isLast && <Separator className="mt-4" />}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}