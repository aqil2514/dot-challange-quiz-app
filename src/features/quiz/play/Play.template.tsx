import { MainContainer } from "@/components/layouts/containers/main-containers";
import { QuizHeader } from "./components/header/quiz.header";
import { QuizContent } from "./components/content/quiz.content";

export function QuizPlayTemplate() {
  return (
    <MainContainer className="flex-col gap-4">
      <QuizHeader />
      <QuizContent />
    </MainContainer>
  );
}
