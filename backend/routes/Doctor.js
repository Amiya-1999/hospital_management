import express from "express";
import {
  addDoctor,
  deleteDoctor,
  getAllDoctor,
  updateDoctorDetails,
} from "../controllers/Doctor.js";

const router = express.Router();

router.get("/", getAllDoctor);
router.post("/add", addDoctor);
router.post("/update/:id", updateDoctorDetails);
router.delete("/delete/:id", deleteDoctor);

export default router;
