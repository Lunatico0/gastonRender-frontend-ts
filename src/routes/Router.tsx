import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, ReactElement } from "react";
import AuthContext from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";
import MyPrivateProjects from "../pages/MyPrivateProjects";
import CompleteProfile from "../pages/CompleteProfile";

// 🔹 Definimos la estructura del usuario en el contexto
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "empleado" | "cliente";
}

// 🔹 Definimos el contexto de autenticación
interface AuthContextType {
  user: User | null;
}

// 🔹 Tipado para las rutas protegidas
interface ProtectedRouteProps {
  element: ReactElement;
  role?: "admin" | "empleado" | "cliente";
}

// 🔒 Componente de ruta protegida
const ProtectedRoute = ({ element, role }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext) as AuthContextType;

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return element;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/my-private-projects" element={<MyPrivateProjects />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} role="admin" />} />
    </Routes>
  );
};

export default AppRouter;
