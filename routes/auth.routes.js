const router = require("express").Router();
const {register,login, verify, forgotPassword, resetPassword, changePassword, logout, checkToken, deleteUser, updateOne} = require("../controler/auth.controler");
const { ensureAuthorized,ensureAuthenticated } = require("../middleware/auth-middleware");

//CREATE
router.post('/register', async (req, res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */

    console.log(JSON.stringify(req.body))

    await register(req.body, res);
});



router.get('/checkToken', async (req, res) => {
    await checkToken(req.body, res);
});


router.post('/login', async (req, res) => {
    await login(req.body, res);
});

router.post('/verify', async (req, res) => {
    await verify(req.body, res);
});

router.delete("/remove/:id",async (req, res) => {    
    await deleteUser(req, res);
});

router.patch("/update/:id",async (req, res) => {    
    await updateOne(req, res);
});


router.post('/forgotPassword', async (req, res) => {
    
    await forgotPassword(req.body, res);
});

router.post('/resetPassword', async (req, res) => {
    
    await resetPassword(req.body, res);
});

router.patch("/changeMdp/:id", async (req, res) => {
    await changePassword(req, res);
});

router.patch("/isBlocked/:id",async (req, res) => {    
    await blockOne(req, res);
});

router.patch("/isNotBlocked/:id",async (req, res) => {    
    await unBlockOne(req, res);
});

router.post('/logout', async (req, res) => {
    await logout(req, res);
});


module.exports = router;