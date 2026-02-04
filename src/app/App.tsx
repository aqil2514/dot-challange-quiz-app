import { AuthTemplate } from "@/features/auth/Auth.template";
import { Toaster } from "@/components/ui/sonner";
import { useAppStore } from "@/store/app.store";
import { MenuTemplate } from "@/features/menu/Menu.template";

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
      return <MenuTemplate />;

    default:
      return <AuthTemplate />;
  }
};

export default App;
