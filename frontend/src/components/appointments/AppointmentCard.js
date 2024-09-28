const AppointmentCard = ({ appointment, onEdit, onDelete }) => {
  return (
    <div className="appointment-card">
      <p>
        <span>Patient:</span>
        {appointment.patientDetails.name}
        <small> ({appointment.patientDetails.age}</small>,{" "}
        <small>{appointment.patientDetails.gender})</small>
      </p>
      <p>
        <span>Doctor:</span>
        {appointment.doctorDetails.name},{" "}
        <small>{appointment.doctorDetails.specialty}</small>
      </p>
      <p>
        <span>Date:</span>
        {new Date(appointment.date).toLocaleDateString()}
      </p>
      <div className="btn-container">
        <button onClick={() => onEdit(appointment)}>Edit</button>
        <button onClick={() => onDelete(appointment._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
