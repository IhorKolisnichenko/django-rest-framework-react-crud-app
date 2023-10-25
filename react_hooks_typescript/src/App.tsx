import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          drfRest
        </a>
        <div className="navbar-nav mr-auto">
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
      {/* <div className="container mt-3">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/tutorials" element={<App />} />
          <Route path="/add" element={<App />} />
          <Route path="/tutorials/:id" element={<App />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
