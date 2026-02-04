import { AuthTemplate } from "@/features/auth/Auth.template";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <AuthTemplate />

      <Toaster richColors position="top-center" closeButton />
    </>
  );
}

export default App;
