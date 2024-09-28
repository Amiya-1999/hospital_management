import Appointment from "../modals/Appointment.js";

// Get all appointments
export const getAllAppointment = async (req, res) => {
  Appointment.find()
    .then((appointments) => res.json(appointments))
    .catch((error) => res.status(400).json("Error: " + error));
};

// Add new appointment
export const addAppointment = async (req, res) => {
  const { patientDetails, doctorDetails, date } = req.body;
  const newAppointment = new Appointment({
    patientDetails,
    doctorDetails,
    date,
  });
  newAppointment
    .save()
    .then((appointment) => res.json(appointment))
    .catch((error) => res.status(400).json("Error: " + error));
};

// Update appointment data
export const updateAppointment = async (req, res) => {
  Appointment.findById(req.params.id)
    .then((appointment) => {
      if (!appointment) return res.status(404).json("Appointment not found");
      appointment.patientDetails.name = req.body.patientDetails.name;
      appointment.patientDetails.age = req.body.patientDetails.age;
      appointment.patientDetails.gender = req.body.patientDetails.gender;
      appointment.doctorDetails.name = req.body.doctorDetails.name;
      appointment.doctorDetails.specialty = req.body.doctorDetails.specialty;
      appointment.date = req.body.date;
      appointment
        .save()
        .then(() => res.json("Appointment has been updated successfully!"))
        .catch((error) => res.status(400).json("Error: " + error));
    })
    .catch((error) => res.status(400).json("Error: " + error));
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
    .then((appointment) => {
      if (!appointment) return res.status(404).json("Appointment not found");
      res.json("Appointment has been deleted successfully!");
    })
    .catch((error) => res.status(400).json("Error: " + error));
};
