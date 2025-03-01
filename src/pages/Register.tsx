import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

console.log("✅ Register.tsx se está ejecutando");

const Register = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext es null. Asegúrate de que AuthProvider envuelve la aplicación.");
  }
  const { register } = auth;

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔍 Intentando registrar:", { name, email, password });

    try {
      await register(name, email, password);
      console.log("✅ Registro exitoso. Redirigiendo a /projects");
      navigate("/projects");
    } catch (error) {
      console.error("❌ Error en el registro:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="mb-4 text-lg font-bold">Crear Cuenta</h2>
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 mb-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
