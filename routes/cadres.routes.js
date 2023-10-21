const router = require("express").Router();
const { updateOne, getOne, removeOne, getCadres,addOne, updateImg, ajouterCadre, searchCadres, getByUrl } = require("../controler/cadres.controller");
const multer = require('multer'); // Middleware pour gérer les fichiers
const path = require('path');
// Configuration de multer pour l'upload de fichiers

const storage = multer.diskStorage({
    destination: "../images",
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.mimetype.split('/')[1]);
    },
  });
  
  const upload = multer({ storage: storage });



router.post("/add",upload.single('image'),async (req, res) => {    
    await ajouterCadre(req, res);
});

router.post("/search",async (req, res) => {    
    await searchCadres(req, res);
});


router.get("/get",async (req, res) => {  
    	  
    await getCadres(req, res);
});

router.patch("/update/:id",async (req, res) => {    
    await updateOne(req, res);
});

router.put("/upload/:id",upload.single('file'),async (req, res) => {    
    await updateImg(req, res);
});

router.get("/find/:id",async (req, res) => {  
    await getOne(req, res);
});

router.get("/url/:url",async (req, res) => {  
    await getByUrl(req, res);
});

router.delete("/remove/:id",async (req, res) => {    
   
    await removeOne(req, res);
});

router.patch("/isBlocked/:id",async (req, res) => {    
    await blockOne(req, res);
});

router.patch("/isNotBlocked/:id",async (req, res) => {    
    await unBlockOne(req, res);
});


module.exports = router;