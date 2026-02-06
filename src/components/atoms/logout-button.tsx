import { useAuth } from "@/store/auth.store";
import { Button } from "../ui/button";
import { useQuizStore } from "@/store/quiz/quiz.store";
import { toast } from "sonner";

export function LogoutButton() {
  const { logout } = useAuth();
  const { updateMeta } = useQuizStore();
  return (
    <Button
      onClick={() => {
        logout();
        updateMeta("quizStatus", "idle");
        toast.success("Berhasil logout!");
      }}
      variant="destructive"
      type="button"
      size={"sm"}
    >
      Logout
    </Button>
  );
}
