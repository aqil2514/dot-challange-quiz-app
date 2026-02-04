export interface AuthStore {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  user: AuthUser | null;
}

export interface AuthUser {
  username: string;
  lastLoginAt: Date;
}
