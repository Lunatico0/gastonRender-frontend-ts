import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/Router";
import Navbar from "./components/Navbar";

console.log("✅ App.tsx se está ejecutando");

const App = () => {
  return (
    <AuthProvider>  {/* ✅ Asegurar que envuelve todo */}
      <Navbar />
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
