import { MainContainer } from "@/components/layouts/containers/main-containers";
import { AuthLoginCard } from "./components/login-card.auth";
import { useAuthGuard } from "@/hooks/use-auth-guard";

export function AuthTemplate() {
  useAuthGuard({ redirectTo: "menu", requireAuth: false });

  return (
    <MainContainer>
      <AuthLoginCard />
    </MainContainer>
  );
}
