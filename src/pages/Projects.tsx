import { useState, useEffect, useContext } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  images: { url: string }[];
}

const Projects = () => {
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error obteniendo proyectos:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>

      <select
        className="mb-4 p-2 border rounded"
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="nueva_construccion">Nueva Construcción</option>
        <option value="remodelacion_completa">Remodelación Completa</option>
        <option value="espacio_especifico">Espacio Específico</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects
          .filter((project) => categoryFilter === "" || project.category === categoryFilter)
          .map((project) => (
            <div key={project._id} className="p-4 border rounded shadow">
              {project.images.length > 0 && (
                <img src={project.images[0].url} alt={project.title} className="w-full h-40 object-cover mb-2" />
              )}
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
              <button
                onClick={() => navigate(`/projects/${project._id}`)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Ver Detalles
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
