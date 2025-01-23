const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dob: String,
    phone: Number,
    height: Number,
    weight: Number,
    address: String,
    emailId: {
      type: String,
      unique: true,
      required: true,
    },
    city: String,
    bloodGroup: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patientProfileSchema", patientProfileSchema);
