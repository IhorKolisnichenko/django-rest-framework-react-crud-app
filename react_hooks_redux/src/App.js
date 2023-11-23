import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddTutorial from "./components/AddTutorial.js";
import Tutorial from "./components/Tutorial.js";
import TutorialsList from "./components/TutorialsList.js";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand ms-2">
          drfRest
        </a>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TutorialsList />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
