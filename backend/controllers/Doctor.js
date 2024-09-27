import Doctor from "../modals/Doctor.js";

// Get all doctors
export const getAllDoctor = async (req, res) => {
  Doctor.find()
    .then((doctors) => res.json(doctors))
    .catch((error) => res.status(400).json("Error: " + error));
};

// Add new doctor
export const addDoctor = async (req, res) => {
  const { name, specialty } = req.body;
  const newDoctor = new Doctor({ name, specialty });
  newDoctor
    .save()
    .then((doctor) => res.json(doctor))
    .catch((error) => res.status(400).json("Error: " + error));
};

// Update doctor data
export const updateDoctorDetails = async (req, res) => {
  Doctor.findById(req.params.id)
    .then((doctor) => {
      if (!doctor) return res.status(404).json("Doctor not found!");
      doctor.name = req.body.name;
      doctor.specialty = req.body.specialty;
      doctor
        .save()
        .then(() => res.json("Doctor details has been updated successfully"))
        .catch((error) => res.status(400).json("Error: " + error));
    })
    .catch((error) => res.status(400).json("Error: " + error));
};

// Delete doctor by ID
export const deleteDoctor = async (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .then((doctor) => {
      if (!doctor) return res.status(404).json("Doctor not found");
      res.json("Doctor details has been deleted successfully!");
    })
    .catch((error) => res.status(400).json("Error: " + error));
};
