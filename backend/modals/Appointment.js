import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  patientDetails: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
  },
  doctorDetails: {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
    },
  },
  date: {
    type: Date,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
