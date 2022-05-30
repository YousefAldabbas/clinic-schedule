const mongoose = require('mongoose');

// firstName: "",
// lastName: "",
// age: "",
// phoneNumber: "",
// address: "",
// date: "",
// time: "6:00 AM",
// note: "",
// amount: "",

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a phone number"]
    },
    address: {
        type: String,
        required: false,
        default: "No address provided"
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    },
    time: {
        type: String,
        required: [true, "Time is required"]
    },
    note: {
        type: String,
        required: false,
        default: "No note provided"
    },
    amount: {
        type: Number,
        required: false,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // this is the user id
        required: true,
        ref: "User" // this is the name of the model
    },
})

module.exports = mongoose.model('Patient', patientSchema);