const router = require("express").Router();
const { getRegions, updateOne, addOne, removeOne } = require("../controler/regions.controller");



router.get("/get",async (req, res) => {  
    	  
    await getRegions(req, res);
});

router.patch("/update",async (req, res) => {    
    await updateOne(req, res);
});

router.post("/add",async (req, res) => {    
    await addOne(req, res);
});

router.delete("/delete/:id",async (req, res) => {  
    console.log("first delete ")  
    await removeOne(req, res);
});



module.exports = router;