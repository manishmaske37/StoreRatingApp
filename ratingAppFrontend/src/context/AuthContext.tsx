import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User, UserRole } from "@/types";
import { mockUsers } from "@/lib/mock-data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    address: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<boolean>;
  setDemoUser: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    async (email: string, _password: string): Promise<boolean> => {
      // Simulate API call
      await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const foundUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
      return false;
    },
    [],
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      address: string,
      _password: string,
    ): Promise<boolean> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: mockUsers.length + 1,
        name,
        email,
        address,
        role: "USER",
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updatePassword = useCallback(
    async (
      _currentPassword: string,
      _newPassword: string,
    ): Promise<boolean> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    },
    [],
  );

  // Demo function to quickly switch between user roles
  const setDemoUser = useCallback((role: UserRole) => {
    const demoUser = mockUsers.find((u) => u.role === role);
    if (demoUser) {
      setUser(demoUser);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updatePassword,
        setDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
