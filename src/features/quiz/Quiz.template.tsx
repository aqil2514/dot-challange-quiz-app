import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useQuizStore } from "@/store/quiz/quiz.store";
import { MenuTemplate } from "./menu/Menu.template";
import { QuizPlayTemplate } from "./play/Play.template";

export function QuizTemplate() {
  useAuthGuard({ redirectTo: "login", requireAuth: true });
  const { meta } = useQuizStore();

  switch (meta.quizStatus) {
    case "idle":
      return <MenuTemplate />;

    case "play":
      return <QuizPlayTemplate />;

    default:
      <MenuTemplate />;
  }
}
