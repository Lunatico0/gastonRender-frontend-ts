import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useContext(AuthContext)!;

  const handleSubmit = async (e: React.FormEvent) => {
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
