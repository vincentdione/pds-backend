const router = require("express").Router();
const { getlangues, updateOne,addOne, removeOne } = require("../controler/langues.controller");



router.get("/get",async (req, res) => {  
    	  
    await getlangues(req, res);
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