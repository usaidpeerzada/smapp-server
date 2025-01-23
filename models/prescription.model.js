const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageName: {
      type: String,
    },
    uri: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("PrescriptionSchema", PrescriptionSchema);
