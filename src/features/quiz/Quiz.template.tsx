import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useQuizStore } from "@/store/quiz/quiz.store";
import { MenuTemplate } from "./menu/Menu.template";
import { QuizPlayTemplate } from "./play/Play.template";
import { HeaderComponent } from "@/components/layouts/headers/headers";
import { QuizFinishedTemplate } from "./finished/Finished.template";

export function QuizTemplate() {
  useAuthGuard({ redirectTo: "login", requireAuth: true });

  return (
    <div className="relative">
      <HeaderComponent />
      <FlexRender />
    </div>
  );
}

const FlexRender = () => {
  const { meta } = useQuizStore();

  switch (meta.quizStatus) {
    case "idle":
      return <MenuTemplate />;

    case "play":
      return <QuizPlayTemplate />;

    case "finished":
      return <QuizFinishedTemplate />;

    default:
      <MenuTemplate />;
  }
};
