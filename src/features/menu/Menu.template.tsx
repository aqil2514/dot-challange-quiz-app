import { MainContainer } from "@/components/layouts/containers/main-containers";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useAuth } from "@/store/auth.store";

export function MenuTemplate() {
  const { logout } = useAuth();

  useAuthGuard({ redirectTo: "login", requireAuth: true });

  return (
    <MainContainer>
      <p>Protected</p>
      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </MainContainer>
  );
}
