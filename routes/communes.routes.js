const router = require("express").Router();
const { updateOne, getCommunes } = require("../controler/communes.controller");



router.get("/get",async (req, res) => {  
    	  
    await getCommunes(req, res);
});

router.patch("/update",async (req, res) => {    
    await updateOne(req, res);
});


module.exports = router;