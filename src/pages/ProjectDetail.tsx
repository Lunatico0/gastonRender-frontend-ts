import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

// 🔹 Definir estructura del proyecto
interface Project {
  _id: string;
  title: string;
  description: string;
  images: { url: string }[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const { data } = await api.get<Project>(`/projects/${id}`);
      setProject(data);
    } catch (error) {
      console.error("Error obteniendo proyecto:", error);
    }
  };

  if (!project) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <p className="text-gray-700">{project.description}</p>
      {project.images.map((image, index) => (
        <img key={index} src={image.url} alt="Proyecto" className="w-full h-60 object-cover my-4" />
      ))}
    </div>
  );
};

export default ProjectDetail;
