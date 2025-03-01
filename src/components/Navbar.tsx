import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">Render3D</Link>
      <div>
        {user ? (
          <>
            <Link to="/projects" className="mr-4">Proyectos</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
