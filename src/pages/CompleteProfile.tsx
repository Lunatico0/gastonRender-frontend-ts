import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

// 🔹 Definir estructura del usuario
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "empleado" | "cliente";
}

// 🔹 Definir estructura del contexto de autenticación
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const CompleteProfile = () => {
  const { user, setUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.put<{ user: User }>("/auth/update-profile", { name, email });
      setUser(data.user || null);
      navigate("/profile");
    } catch (error: any) {
      console.error("❌ Error actualizando perfil:", error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Completa tu Perfil</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 mb-2 border rounded"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
