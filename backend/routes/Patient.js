import express from "express";
import {
  addPatient,
  deletePatient,
  getAllPatient,
  updatePatientDetails,
} from "../controllers/Patient.js";

const router = express.Router();

router.get("/", getAllPatient);
router.post("/add", addPatient);
router.post("/update/:id", updatePatientDetails);
router.delete("/delete/:id", deletePatient);

export default router;
