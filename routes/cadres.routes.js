const router = require("express").Router();
const { updateOne, getOne, removeOne, getCadres,addOne, updateImg, ajouterCadre, searchCadres, getByUrl,importData } = require("../controler/cadres.controller");
const multer = require('multer'); 
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.resolve(__dirname, '../../images');
        cb(null, destinationPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
  });
  
  const upload = multer({ storage: storage });



router.post("/add",upload.single('image'),async (req, res) => {    
    await ajouterCadre(req, res);
});

router.post("/import",async (req, res) => {    
    await importData(req, res);
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


router.post("/upload/:id", upload.single('file'), async (req, res) => {
    await updateImg(req, res);
  });



module.exports = router;