import "./App.css";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appointments from "./components/appointments/Appointments";
import Doctors from "./components/doctors/Doctors";
import Patients from "./components/patients/Patients";

function App() {
  const isLinkActive = (currPath) => window.location.pathname === currPath;

  return (
    <Router>
      <div className="container">
        <h1 style={{ color: "green" }}>AD Hospital Managment</h1>
        <nav>
          <ul>
            <li className={isLinkActive("/appointments") ? "active" : ""}>
              <Link to="/appointments">Appointments</Link>
            </li>
            <li className={isLinkActive("/doctors") ? "active" : ""}>
              <Link to="/doctors">Doctors</Link>
            </li>
            <li className={isLinkActive("/patients") ? "active" : ""}>
              <Link to="/patients">Patients</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
