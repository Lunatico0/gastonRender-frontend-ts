import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Projects from "../pages/Projects";
// import ProjectDetail from "../pages/ProjectDetail";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        {/* <Route path="/projects/:id" element={<ProjectDetail />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
