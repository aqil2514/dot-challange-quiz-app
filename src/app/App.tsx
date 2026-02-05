import { AuthTemplate } from "@/features/auth/Auth.template";
import { Toaster } from "@/components/ui/sonner";
import { useAppStore } from "@/store/app.store";
import { QuizTemplate } from "@/features/quiz/Quiz.template";

function App() {
  return (
    <>
      <FlexRender />

      <Toaster richColors position="top-center" closeButton />
    </>
  );
}

const FlexRender = () => {
  const { page } = useAppStore();
  switch (page) {
    case "login":
      return <AuthTemplate />;

    case "menu":
      return <QuizTemplate />;

    default:
      return <AuthTemplate />;
  }
};

export default App;
