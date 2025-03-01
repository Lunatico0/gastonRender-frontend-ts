import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Render3D</h1>
      <p className="text-lg text-gray-700 mb-6">
        Explora impresionantes renderizados 3D de proyectos arquitectónicos.
      </p>

      {user ? (
        <Link to="/projects" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
          Ver Proyectos
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
