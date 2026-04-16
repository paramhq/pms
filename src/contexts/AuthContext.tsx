import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  fullName: string;
  email: string;
  displayName: string;
  initials: string;
  avatarColor: string;
  role: "admin" | "member";
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "pms_auth_user";

const MOCK_USER: User = {
  id: "usr_001",
  fullName: "Sukhdev Z.",
  email: "system@gnwebsoft.com",
  displayName: "Sukhdev Z.",
  initials: "SZ",
  avatarColor: "#3c71ff",
  role: "admin",
};

function getStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);

  const login = useCallback(async (_email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
    setUser(MOCK_USER);
  }, []);

  const register = useCallback(
    async (fullName: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 500));
      const newUser: User = {
        ...MOCK_USER,
        id: `usr_${Date.now()}`,
        fullName,
        email,
        displayName: fullName,
        initials: fullName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, register, logout }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useCurrentUser() {
  const { user } = useAuth();
  if (!user) throw new Error("useCurrentUser called outside authenticated context");
  return user;
}
