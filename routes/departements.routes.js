const router = require("express").Router();
const { getDepartements, updateOne } = require("../controler/departements.controller");



router.get("/get",async (req, res) => {  
    	  
    await getDepartements(req, res);
});

router.patch("/update",async (req, res) => {    
    await updateOne(req, res);
});


module.exports = router;