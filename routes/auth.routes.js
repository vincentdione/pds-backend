const router = require("express").Router();
const {register,login, verify, forgotPassword, resetPassword, changePassword, logout, checkToken} = require("../controler/auth.controler");
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

router.post('/forgotPassword', async (req, res) => {
    
    await forgotPassword(req.body, res);
});

router.post('/resetPassword', async (req, res) => {
    
    await resetPassword(req.body, res);
});

router.post('/changePassword',ensureAuthenticated,ensureAuthorized(["user"]), async (req, res) => {
    await changePassword(req.body, res);
});

router.post('/logout', async (req, res) => {
    await logout(req, res);
});


module.exports = router;