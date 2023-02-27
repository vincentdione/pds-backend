const router = require("express").Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const patientRoutes = require("./patient.routes");
const hopitalRoutes = require("./hopital.routes");
const radioRoutes = require("./radio.routes");


router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/patients", patientRoutes);
router.use("/api/hopital", hopitalRoutes);
router.use("/api/radios", radioRoutes);



module.exports = router;
