import { MainContainer } from "@/components/layouts/containers/main-containers";
import { AuthLoginCard } from "./components/login-card.auth";

export function AuthTemplate() {
  return (
    <MainContainer>
      <AuthLoginCard />
    </MainContainer>
  );
}
