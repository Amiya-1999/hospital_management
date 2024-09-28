import { useEffect, useState } from "react";
import axios from "axios";
import PatientCard from "./PatientCard";
import "../../styles/Patients.css";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const baseUrl = "http://localhost:1000/patients";

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((res) => setPatients(res.data))
      .catch((err) => console.log("Error fetching patients: " + err));
  }, []);

  const handleAddPatient = (event) => {
    event.preventDefault();
    axios
      .post(baseUrl + "/add", newPatient)
      .then((res) => {
        setPatients([...patients, res.data]);
        setNewPatient({ name: "", age: "", gender: "" });
        alert("Patient details has been added successfully!");
      })
      .catch((err) => console.log("Error adding patient: " + err));
  };

  const handleUpdatePatient = (event, id) => {
    event.preventDefault();
    axios
      .post(baseUrl + "/update/" + id, selectedPatient)
      .then((res) => {
        const updatedPatient = {
          ...selectedPatient,
          _id: id,
        };
        setPatients(
          patients.map((patient) =>
            patient._id === id ? updatedPatient : patient
          )
        );
        setSelectedPatient(null);
        setIsEditMode(false);
        alert(res.data);
      })
      .catch((err) => console.log("Error updating patient: " + err));
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(baseUrl + "/delete/" + id)
      .then((res) => {
        setPatients(patients.filter((patient) => patient._id !== id));
        setSelectedPatient(null);
        alert(res.data);
      })
      .catch((err) => console.log("Error deleting patient: " + err));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className="patient-main">
      <div style={{ width: "45%" }}>
        <h3 style={{ textAlign: "center" }}>
          {isEditMode ? "Edit Patient" : "Add New Patient"}
        </h3>
        <div className="form-sections">
          <form
            onSubmit={
              isEditMode
                ? (e) => handleUpdatePatient(e, selectedPatient._id)
                : handleAddPatient
            }
          >
            <label>Name: </label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.name : newPatient.name}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      name: e.target.value,
                    })
                  : setNewPatient({
                      ...newPatient,
                      name: e.target.value,
                    })
              }
            />
            <br />
            <label>Age: </label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.age : newPatient.age}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      age: e.target.value,
                    })
                  : setNewPatient({
                      ...newPatient,
                      age: e.target.value,
                    })
              }
            />
            <br />
            <label>Gender: </label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.gender : newPatient.gender}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      gender: e.target.value,
                    })
                  : setNewPatient({
                      ...newPatient,
                      gender: e.target.value,
                    })
              }
            />
            <br />
            <button type="submit">
              {isEditMode ? "Update Patient" : "Add Patient"}
            </button>
          </form>
        </div>
      </div>
      <div className="patients-section">
        <h3 style={{ textAlign: "center" }}>Patients ({patients.length})</h3>

        <div className="patient-list">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
