const { authJwt } = require("../middlewares");
const mongoose = require("mongoose");
const MedsSchema = mongoose.model("MedsSchema");
const User = mongoose.model("User");
const PrescriptionSchema = mongoose.model("PrescriptionSchema");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin]);

  app.get("/api/get-meds", async (req, res) => {
    try {
      const currentUserId = await req.query["userId"];
      if (currentUserId.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findOne({ _id: currentUserId }).populate({
          path: "medicines",
        });
        return res.send({ medicines: user.medicines });
      } else {
        return res.send("Invalid user id");
      }
    } catch (err) {
      console.log("error in get medicines: ", err);
    }
  });

  app.post("/api/save-meds", async (req, res) => {
    try {
      const { userId, medName, medDescription, dose, medType, date, time } =
        req.body;
      // const user = await User.findOne({ _id: userId });
      const newMed = await MedsSchema.create({
        userId: userId,
        medName,
        medDescription,
        dose,
        medType,
        date,
        time,
      });
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { medicines: newMed } }
      );
      return res.json({ newMed });
    } catch (err) {
      return res.status(422).send({ error: "medicine not saved!" });
    }
  });

  app.delete("/api/delete-meds", (req, res) => {
    const id = req.body.id;
    MedsSchema.findByIdAndRemove(id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/api/get-pres-images", async (req, res) => {
    try {
      const currentUserId = await req.query["userId"];
      if (currentUserId.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await User.findOne({ _id: currentUserId }).populate({
          path: "prescriptions",
        });
        return res.send(user.prescriptions);
      }
    } catch (err) {
      console.log("error in get medicines: ", err);
    }
  });
  app.post("/api/save-pres-image", async (req, res) => {
    try {
      const { userId, uri, imageName } = req.body;
      const newPresImg = await PrescriptionSchema.create({
        userId: userId,
        uri: uri,
        imageName: imageName,
      });
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { prescriptions: newPresImg } }
      );
      return res.json({ newPresImg });
    } catch (err) {
      return res.status(422).send({ error: "prescription not saved!" });
    }
  });
  app.delete("/api/delete-pres", (req, res) => {
    const id = req.body.id;
    PrescriptionSchema.findByIdAndRemove(id, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
};
