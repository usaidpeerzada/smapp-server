const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedsSchema" }],
      prescriptions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "PrescriptionSchema" },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      timestamps: true,
    }
  )
);

module.exports = User;
