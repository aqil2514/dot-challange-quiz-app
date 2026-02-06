import { MainContainer } from "@/components/layouts/containers/main-containers";
import { QuizHeader } from "./components/header/quiz.header";
import { QuizContent } from "./components/content/quiz.content";
import { useEffect } from "react";
import { useQuizStore } from "@/store/quiz/quiz.store";

export function QuizPlayTemplate() {
  const { updateMeta } = useQuizStore();

useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  const handleUnload = () => {
    updateMeta("quizStatus", "idle");
  };

  window.addEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener("unload", handleUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.removeEventListener("unload", handleUnload);
  };
}, [updateMeta]);

  return (
    <MainContainer className="flex-col gap-4">
      <QuizHeader />
      <QuizContent />
    </MainContainer>
  );
}
