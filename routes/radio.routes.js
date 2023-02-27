const router = require("express").Router();
const { createRadio, getRadios, updateOne, getOne, removeOne } = require("../controler/radio.controller");
const { verifyToken,verifyUser,isAdmin } = require("../middleware/authJwt");


router.post("/add",async (req, res) => {    
    await createRadio(req.body, res);
});

router.get("/get",async (req, res) => {  
    	  
    await getRadios(req, res);
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