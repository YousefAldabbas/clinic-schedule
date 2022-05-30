const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const { getPatients, getPatient, addPatient, updatePatient, deletePatient } = require("../controllers/patientController");

router.route("/").get(protect,getPatients).post(protect,addPatient);
router.route("/:id").get(protect,getPatient).put(protect,updatePatient).delete(protect,deletePatient);

module.exports = router;