const router = require("express").Router();
const { updateOne, getOne, removeOne, getCadres,addOne, updateImg, ajouterCadre, searchCadres } = require("../controler/cadres.controller");
const multer = require('multer'); // Middleware pour gérer les fichiers
const path = require('path');
// Configuration de multer pour l'upload de fichiers

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });



router.post("/add",upload.single('file'),async (req, res) => {    
    await ajouterCadre(req, res);
});

router.post("/search",async (req, res) => {    
    await searchCadres(req, res);
});


router.get("/get",async (req, res) => {  
    	  
    await getCadres(req, res);
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

router.patch("/isBlocked/:id",async (req, res) => {    
    await blockOne(req, res);
});

router.patch("/isNotBlocked/:id",async (req, res) => {    
    await unBlockOne(req, res);
});


module.exports = router;