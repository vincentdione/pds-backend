const router = require("express").Router();
const {  updateOne, getOne, removeOne, createHopital, getHopitaux } = require("../controler/hopital.controller");
const { verifyToken,verifyUser,isAdmin } = require("../middleware/authJwt");


router.post("/add",async (req, res) => {    
    await createHopital(req.body, res);
});

router.get("/get",async (req, res) => {  
    	  
    await getHopitaux(req, res);
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