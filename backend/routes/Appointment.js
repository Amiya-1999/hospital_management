import express from "express";
import {
  addAppointment,
  deleteAppointment,
  getAllAppointment,
  updateAppointment,
} from "../controllers/Appointment.js";

const router = express.Router();

router.get("/", getAllAppointment);
router.post("/add", addAppointment);
router.post("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);

export default router;
