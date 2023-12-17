const router = require("express").Router();
const { getPays, updateOne,addOne, removeOne } = require("../controler/pays.controller");



router.get("/get",async (req, res) => {  
    	  
    await getPays(req, res);
});

router.patch("/update/:id",async (req, res) => {    
    await updateOne(req, res);
});

router.post("/add",async (req, res) => {    
    await addOne(req, res);
});

router.delete("/delete/:id",async (req, res) => {    
    await removeOne(req, res);
});

module.exports = router;