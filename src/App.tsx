import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/Router";
import Navbar from "./components/Navbar";

// 🔹 Componente principal de la aplicación
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <AppRouter />
      </AuthProvider>
    </Router>
  );
};

export default App;
