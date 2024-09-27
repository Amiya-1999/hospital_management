import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import appointmentRouter from "./routes/Appointment.js";
import doctorRouter from "./routes/Doctor.js";
import patientRouter from "./routes/Patient.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.use("/appointments", appointmentRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
connection.on("error", (error) => {
  console.log("Failed to connect to MongoDB", error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
