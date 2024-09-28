import { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import "../../styles/Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const baseUrl = "http://localhost:1000/doctors";

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl + "/add", newDoctor)
      .then((response) => {
        setDoctors([...doctors, response.data]);
        setNewDoctor({
          name: "",
          specialty: "",
        });
        alert("Doctor details has been added successfully!");
      })
      .catch((error) => console.error("Error adding doctor:", error));
  };

  const handleUpdateDoctor = (id, e) => {
    e.preventDefault();
    axios
      .post(baseUrl + `/update/${id}`, selectedDoctor)
      .then((response) => {
        const updateDoc = {
          ...selectedDoctor,
          _id: id,
        };

        setDoctors(
          doctors.map((doctor) => (doctor._id === id ? updateDoc : doctor))
        );

        setSelectedDoctor(null);
        setIsEditMode(false);
        alert(response.data);
      })
      .catch((error) => console.error("Error updating doctor:", error));
  };

  const handleDeleteDoctor = (id) => {
    axios
      .delete(baseUrl + `/delete/${id}`)
      .then((response) => {
        setDoctors(doctors.filter((doctor) => doctor._id !== id));
        setSelectedDoctor(null);
        alert(response.data);
      })
      .catch((error) => console.error("Error deleting doctor:", error));
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  };

  return (
    <div className="main-doc-container">
      <div style={{ width: "45%" }}>
        <h4 style={{ textAlign: "center" }}>
          {isEditMode ? "Edit Doctor" : "Add New Doctor"}
        </h4>
        <div className="form-sections">
          <form
            onSubmit={
              isEditMode
                ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                : handleAddDoctor
            }
          >
            <label>Name: </label>
            <input
              type="text"
              value={isEditMode ? selectedDoctor.name : newDoctor.name}
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      name: e.target.value,
                    })
                  : setNewDoctor({
                      ...newDoctor,
                      name: e.target.value,
                    })
              }
            />
            <br />
            <label>Specialty: </label>
            <input
              type="text"
              value={
                isEditMode ? selectedDoctor.specialty : newDoctor.specialty
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedDoctor({
                      ...selectedDoctor,
                      specialty: e.target.value,
                    })
                  : setNewDoctor({
                      ...newDoctor,
                      specialty: e.target.value,
                    })
              }
            />
            <br />
            <button type="submit">
              {isEditMode ? "Update Doctor" : "Add Doctor"}
            </button>
          </form>
        </div>
      </div>
      <div className="doctors-section">
        <h3>Doctors ({doctors.length}) </h3>
        <div className="doctor-list">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onEdit={handleEditDoctor}
              onDelete={handleDeleteDoctor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
