const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");

// @route   GET api/patients
// @desc    Get all patients
// @access  Private
const getPatients = asyncHandler(async (req, res, next) => {
  const patients = await Patient.find({ user: req.user.id});
  res.status(200).json(
    patients,
  );
});

// @route   POST api/patients
// @desc    Create a patient
// @access  Private
const addPatient = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const patient = await Patient.create({
    ...req.body,
    user: req.user.id,
  });
  if (!patient) {
    res.status(400);
    throw new Error("Patient could not be created");
  }
  res.status(201).json({
    patient,
  });
});

//@route   GET api/patients/:id
//@desc    Get a patient
//@access  Private
const getPatient = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (!user || !id) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const patient = await Patient.findOne({ _id: id, user: user._id });
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }
  res.status(200).json(
    patient
  );
});

//@route   PUT api/patients/:id
//@desc    update a patient
//@access  Private
const updatePatient = asyncHandler(async (req, res, next) => {
  const { user,body } = req;
  const { id } = req.params;

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  if (
    !body.firstName ||
    !body.lastName ||
    !body.age ||
    !body.phoneNumber ||
    !body.date ||
    !body.time
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  const patient = await Patient.findOneAndUpdate(
    { _id: id, user: user._id },
    {
      firstName: body.firstName,
      lastName: body.lastName,
      age: body.age,
      phoneNumber: body.phoneNumber,
      address: body.address,
      date: body.date,
      time: body.time,
      note: body.note,
      amount: body.amount,
      user: user._id,
    },
    { new: true } //returns the updated document
  );
  console.log(patient)
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }
  res.status(200).json({
    patient,
  });
});

//@route   DELETE api/patients/:id
//@desc    Delete a patient
//@access  Private
const deletePatient = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  if (!user || !id) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const patient = await Patient.findOneAndDelete({
    _id: id,
    user: user._id,
  });
  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }
  res.status(200).json({
    patient,
  });
});

module.exports = {
  getPatients,
  addPatient,
  getPatient,
  updatePatient,
  deletePatient,
};
