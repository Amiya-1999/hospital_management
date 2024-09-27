import Patient from "../modals/Patient.js";

// Get all patient
export const getAllPatient = async (req, res) => {
  Patient.find()
    .then((patients) => res.json(patients))
    .catch((error) => res.status(400).json("Error: " + error));
};

// Add new patient
export const addPatient = async (req, res) => {
  const { name, age, gender } = req.body;
  const newPatient = new Patient({ name, age, gender });
  newPatient
    .save()
    .then((patient) => res.json(patient))
    .catch((error) => res.status(400).json("Error: " + error));
};

// Update patient data
export const updatePatientDetails = async (req, res) => {
  Patient.findById(req.params.id)
    .then((patient) => {
      if (!patient) return res.status(404).json("Patient not found!");
      patient.name = req.body.name;
      patient.age = req.body.age;
      patient.gender = req.body.gender;
      patient
        .save()
        .then(() => res.json("Patient details has been updated successfully"))
        .catch((error) => res.status(400).json("Error: " + error));
    })
    .catch((error) => res.status(400).json("Error: " + error));
};

// Delete patient by ID
export const deletePatient = async (req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then((patient) => {
      if (!patient) return res.status(404).json("Patient not found");
      res.json("Patient details has been deleted successfully!");
    })
    .catch((error) => res.status(400).json("Error: " + error));
};
