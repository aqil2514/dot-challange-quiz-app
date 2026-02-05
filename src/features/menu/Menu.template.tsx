import { MainContainer } from "@/components/layouts/containers/main-containers";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { MenuCard } from "./components/card/card.menu";

export function MenuTemplate() {
  useAuthGuard({ redirectTo: "login", requireAuth: true });

  return (
    <MainContainer>
      <MenuCard />
    </MainContainer>
  );
}
