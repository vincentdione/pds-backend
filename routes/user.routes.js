const router = require("express").Router();
const { updateOne, getOne, removeOne, getUsers,addOne, getRoles, blockOne, unBlockOne, updateImg, changePassword } = require("../controler/user.controller");
const { verifyToken,verifyUser,isAdmin } = require("../middleware/authJwt");


/* 
router.get("/checkauthentication", verifyToken,async (req,res,next) => {  
    res.send("Hello you are logged in")
});


router.get("/checkuser/:id", verifyUser,async (req,res,next) => {  
    res.send("Hello you are logged in and you can delete")
});

router.get("/checkadmin/:id", isAdmin, (req,res,next)=>{
   res.send("hello admin, you are logged in and you can delete all accounts")
})
 */


router.post("/add",async (req, res) => {    
    await addOne(req.body, res);
});

router.get("/get",async (req, res) => {  
    	  
    await getUsers(req, res);
});

router.get("/roles",async (req, res) => {  
    	  
    await getRoles(req, res);
});



router.patch("/update",async (req, res) => {    
    await updateOne(req, res);
});

router.put("/upload/:id",async (req, res) => {    
    await updateImg(req, res);
});

router.get("/find/:id",async (req, res) => {  
    await getOne(req, res);
});

router.delete("/remove/:id",async (req, res) => {    
   
    await removeOne(req, res);
});

router.patch("/isactive/:id",async (req, res) => {    
    await blockOne(req, res);
});

router.patch("/isnotactive/:id",async (req, res) => {    
    await unBlockOne(req, res);
});

router.put("/changepassword/test",async (req, res) => {   
    await changePassword(req, res);
});


module.exports = router;