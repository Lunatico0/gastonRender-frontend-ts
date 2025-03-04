import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

// 🔹 Definir estructura del usuario
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "empleado" | "cliente";
  needsUpdate: boolean;
}

// 🔹 Definir estructura del contexto de autenticación
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 🔹 Crear contexto con valores iniciales
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get<{ user: User }>("/auth/profile")
        .then(({ data }) => setUser(data.user))
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data } = await api.post<{ token: string; user: User }>("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);

      navigate(data.user.role === "cliente" && data.user.needsUpdate ? "/complete-profile" : "/profile");
    } catch (error: any) {
      console.error("Error en login:", error.response ? error.response.data.message : error.message);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    try {
      const { data } = await api.post<{ token: string; user: User }>("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/profile");
    } catch (error: any) {
      console.error("Error en registro:", error);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
