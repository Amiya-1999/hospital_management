import { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import "../../styles/Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientDetails: {
      name: "",
      age: "",
      gender: "",
    },
    doctorDetails: {
      name: "",
      specialty: "",
    },
    date: "",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const baseUrl = "http://localhost:1000/appointments";

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();

    axios
      .post(baseUrl + "/add", newAppointment)
      .then((response) => {
        setAppointments([...appointments, response.data]);
        setNewAppointment({
          patientDetails: {
            name: "",
            age: "",
            gender: "",
          },
          doctorDetails: {
            name: "",
            specialty: "",
          },
          date: "",
        });
        alert("Doctor data has been added successfully!");
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    axios
      .post(baseUrl + `/update/${id}`, selectedAppointment)
      .then((response) => {
        const updateApp = {
          ...selectedAppointment,
          _id: id,
        };
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? updateApp : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false);
        alert(response.data);
      })
      .catch((error) => console.error("Error updating appointment:", error));
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(baseUrl + `/delete/${id}`)
      .then((response) => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
        setSelectedAppointment(null);
        alert(response.data);
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  return (
    <div className="flex-row" style={{ width: "100%" }}>
      <div className="flex-column">
        <div className="add-form">
          <h4>{isEditMode ? "Edit Appointment" : "Add New Appointment"}</h4>
          <form
            className="appointment-form"
            onSubmit={
              isEditMode
                ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                : handleAddAppointment
            }
          >
            <label>Patient Name:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment.patientDetails.name
                  : newAppointment.patientDetails.name
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      patientDetails: {
                        ...selectedAppointment.patientDetails,
                        name: e.target.value,
                      },
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      patientDetails: {
                        ...newAppointment.patientDetails,
                        name: e.target.value,
                      },
                    })
              }
            />
            <label>Patient Age:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment.patientDetails.age
                  : newAppointment.patientDetails.age
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      patientDetails: {
                        ...selectedAppointment.patientDetails,
                        age: e.target.value,
                      },
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      patientDetails: {
                        ...newAppointment.patientDetails,
                        age: e.target.value,
                      },
                    })
              }
            />
            <label>Patient Gender:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment.patientDetails.gender
                  : newAppointment.patientDetails.gender
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      patientDetails: {
                        ...selectedAppointment.patientDetails,
                        gender: e.target.value,
                      },
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      patientDetails: {
                        ...newAppointment.patientDetails,
                        gender: e.target.value,
                      },
                    })
              }
            />
            <label>Doctor Name:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment.doctorDetails.name
                  : newAppointment.doctorDetails.name
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      doctorDetails: {
                        ...selectedAppointment.doctorDetails,
                        name: e.target.value,
                      },
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      doctorDetails: {
                        ...newAppointment.doctorDetails,
                        name: e.target.value,
                      },
                    })
              }
            />
            <label>Doctor Specialty:</label>
            <input
              type="text"
              value={
                isEditMode
                  ? selectedAppointment.doctorDetails.specialty
                  : newAppointment.doctorDetails.specialty
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      doctorDetails: {
                        ...selectedAppointment.doctorDetails,
                        specialty: e.target.value,
                      },
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      doctorDetails: {
                        ...newAppointment.doctorDetails,
                        specialty: e.target.value,
                      },
                    })
              }
            />
            <label>Date:</label>
            <input
              type="date"
              value={
                isEditMode
                  ? selectedAppointment.date.split("T")[0]
                  : newAppointment.date.split("T")[0]
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      date: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
              }
            />
            <button type="submit">
              {isEditMode ? "Update Appointment" : "Add Appointment"}
            </button>
          </form>
        </div>
      </div>
      <div className="appointments">
        <h3>Appointments ({appointments.length})</h3>
        <div className="appointment-list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
