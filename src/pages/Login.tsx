import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// 🔹 Definir estructura del contexto de autenticación
interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
}

const Login = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  if (!auth) {
    throw new Error("AuthContext es null. Asegúrate de que AuthProvider envuelve la aplicación.");
  }

  const { login } = auth;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/projects");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="mb-4 text-lg font-bold">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
