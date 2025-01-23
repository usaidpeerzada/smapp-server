const mongoose = require("mongoose");

const MedsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    medName: {
      type: String,
    },
    medDescription: {
      type: String,
    },
    dose: {
      type: Number,
    },
    medType: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("MedsSchema", MedsSchema);
