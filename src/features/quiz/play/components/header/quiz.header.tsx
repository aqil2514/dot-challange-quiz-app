import { useQuizStore } from "@/store/quiz/quiz.store";

export function QuizHeader() {
  const { meta, progress } = useQuizStore();

  if(!meta || !progress) return null;
  return (
    <div className="space-y-4 w-5xl px-4">
      <div className="space-y-2">
        <p className="text-3xl text-center font-bold">Mainkan Quiz</p>
        {meta.config && (
          <p className="text-xl text-center font-semibold text-muted-foreground">
            Kategori : {meta.config.categoryName}
          </p>
        )}
      </div>
      <p className="font-semibold text-lg">Pertanyaan ke-{progress.currentIndex + 1}</p>
    </div>
  );
}
