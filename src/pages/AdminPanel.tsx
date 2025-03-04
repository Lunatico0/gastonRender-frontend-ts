import { useState, useContext, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

// 🔹 Definir estructura del usuario
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "cliente" | "empleado";
}

// 🔹 Definir estructura del cliente
interface Client {
  _id: string;
  name: string;
  email: string;
}

// 🔹 Definir estructura del contexto de autenticación
interface AuthContextType {
  user: User | null;
}

const AdminPanel = () => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("nueva_construccion");
  const [status, setStatus] = useState<string>("publico");
  const [images, setImages] = useState<File[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempName, setTempName] = useState<string>("");

  useEffect(() => {
    fetchClients();
  }, []);


  const fetchClients = async () => {
    try {
      const { data } = await api.get<Client[]>("/auth/clients");
      setClients(data);
    } catch (error) {
      console.error("❌ Error obteniendo clientes:", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post<{ tempPassword: string }>("/auth/create-user", {
        name: tempName,
        email: tempEmail,
        role: "cliente",
      });

      console.log("🔐 Contraseña temporal:", data.tempPassword);
      alert(`Usuario creado con éxito.\n\n📧 Email: ${tempEmail}\n🔑 Contraseña: ${data.tempPassword}\n\nRecuerda compartir estos datos con el cliente.`);

      setTempName("");
      setTempEmail("");
      fetchClients();
    } catch (error: any) {
      console.error("❌ Error creando usuario:", error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (images.length === 0) {
        console.error("❌ Debes subir al menos una imagen.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("status", status);

      if (status === "privado" && selectedClient) {
        formData.append("clientId", selectedClient);
      }

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Proyecto creado:", response.data);
      navigate("/projects");
    } catch (error: any) {
      console.error("❌ Error creando proyecto:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      {/* 🔹 Formulario para crear un nuevo usuario cliente */}
      <div className="p-4 border rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">Crear Usuario Cliente</h3>
        <form onSubmit={handleCreateUser}>
          <input
            type="text"
            placeholder="Nombre del Cliente"
            className="w-full p-2 mb-2 border rounded"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo Electrónico del Cliente"
            className="w-full p-2 mb-2 border rounded"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            required
          />
          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded mt-2">
            Crear Cliente
          </button>
        </form>
      </div>

      {/* 🔹 Formulario para crear un nuevo proyecto */}
      <h3 className="text-xl font-semibold mb-2">Nuevo Proyecto</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 mb-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          className="w-full p-2 mb-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-2 mb-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="nueva_construccion">Nueva Construcción</option>
          <option value="remodelacion_completa">Remodelación Completa</option>
          <option value="espacio_especifico">Espacio Específico</option>
        </select>

        <select
          className="w-full p-2 mb-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>

        {status === "privado" && (
          <select
            className="w-full p-2 mb-2 border rounded"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option value="">Seleccionar cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name || client.email}
              </option>
            ))}
          </select>
        )}

        <input type="file" multiple className="w-full p-2 mb-2 border rounded" onChange={handleImageChange} />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          Crear Proyecto
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
