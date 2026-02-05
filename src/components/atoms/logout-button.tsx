import { useAuth } from "@/store/auth.store";
import { Button } from "../ui/button";
import { useQuizStore } from "@/store/quiz/quiz.store";
import { toast } from "sonner";

export function LogoutButton() {
  const { logout } = useAuth();
  const { updateMeta, updateQuiz } = useQuizStore();
  return (
    <Button
      onClick={() => {
        logout();
        updateMeta("quizStatus", "idle");
        updateQuiz([]);
        toast.success("Berhasil logout!");
      }}
      variant="destructive"
      type="button"
    >
      Logout
    </Button>
  );
}
