const router = require("express").Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const cadreRoutes = require("./cadres.routes");
const regionRoutes = require("./regions.routes");
const departementRoutes = require("./departements.routes");
const communeRoutes = require("./communes.routes");
const langueRoutes = require("./langues.routes");
const paysRoutes = require("./pays.routes");


router.use("/api/auth", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/cadres", cadreRoutes);
router.use("/api/regions", regionRoutes);
router.use("/api/departements", departementRoutes);
router.use("/api/communes", communeRoutes);
router.use("/api/langues", langueRoutes);
router.use("/api/pays", paysRoutes);



module.exports = router;
