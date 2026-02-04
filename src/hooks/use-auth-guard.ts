import { useEffect } from "react";
import { useAuth } from "@/store/auth.store";
import { useAppStore, type PageNameType } from "@/store/app.store";

interface PageGuardOptions {
  requireAuth?: boolean;
  redirectTo: PageNameType;
}

export function useAuthGuard(options: PageGuardOptions) {
  const { requireAuth = false, redirectTo } = options;
  const { isAuthenticated } = useAuth();
  const { setPage } = useAppStore();

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      setPage(redirectTo);
    }

    if (!requireAuth && isAuthenticated) {
      setPage(redirectTo);
    }
  }, [requireAuth, redirectTo, isAuthenticated, setPage]);
}
