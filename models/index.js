const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.meds = require("./meds.model");
db.patient = require("./patient.model");
db.prescription = require("./prescription.model");

module.exports = db;
