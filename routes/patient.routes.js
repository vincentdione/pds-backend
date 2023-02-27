const router = require("express").Router();
const { createPatient, getPatients, updateOne, getOne, removeOne } = require("../controler/patient.controller");
const { verifyToken,verifyUser,isAdmin } = require("../middleware/authJwt");


router.post("/add",async (req, res) => {    
    await createPatient(req.body, res);
});

router.get("/get",async (req, res) => {  
    await getPatients(req, res);
});

router.patch("/update",async (req, res) => {    
    await updateOne(req, res);
});

router.get("/find/:id",async (req, res) => {  
    await getOne(req, res);
});

router.delete("/remove/:id",async (req, res) => {    
    await removeOne(req, res);
});


module.exports = router;