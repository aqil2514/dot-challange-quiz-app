import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz/quiz.store";

export function FinishedFooter() {
  const { updateMeta, clearProgress } = useQuizStore();

  const backToMenuHandler = () => {
    updateMeta("quizStatus", "idle");
    clearProgress();
  };
  return (
    <div className="flex justify-center gap-4 w-full">
      <Button variant={"outline"} onClick={backToMenuHandler} >Kembali ke Menu</Button>
    </div>
  );
}
