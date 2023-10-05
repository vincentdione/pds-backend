const router = require("express").Router();
const { getRegions, updateOne } = require("../controler/regions.controller");



router.get("/get",async (req, res) => {  
    	  
    await getRegions(req, res);
});

router.patch("/update",async (req, res) => {    
    await updateOne(req, res);
});


module.exports = router;