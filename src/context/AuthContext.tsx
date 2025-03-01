import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/api";

console.log("✅ AuthContext.tsx se está ejecutando");

// 🔹 Definir estructura del usuario
interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

// 🔹 Estructura del contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

console.log("🔍 AuthContext creado:", AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  console.log("🔍 Estado inicial del usuario:", user);

  useEffect(() => {
    console.log("🔍 Ejecutando useEffect en AuthContext");
    const token = localStorage.getItem("token");
    if (token) {
      api.get<{ user: User }>("/auth/profile")
        .then(({ data }) => {
          setUser(data.user);
          console.log("✅ Usuario autenticado:", data.user);
        })
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    console.log("🔍 Iniciando sesión con:", email);
    try {
      const { data } = await api.post<User>("/auth/login", { email, password });
      localStorage.setItem("token", data.token!);
      setUser(data);
      console.log("✅ Login exitoso:", data);
    } catch (error) {
      console.error("❌ Error en login:", error);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    console.log("🔍 Registrando usuario:", name);
    try {
      const { data } = await api.post<User>("/auth/register", { name, email, password });
      localStorage.setItem("token", data.token!);
      setUser(data);
      console.log("✅ Registro exitoso:", data);
    } catch (error) {
      console.error("❌ Error en registro:", error);
    }
  };

  const logout = () => {
    console.log("🔍 Cerrando sesión...");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
