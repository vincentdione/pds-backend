
// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();
const router = require("./routes/index");
const  multer = require("multer");
const dotenv = require('dotenv')
console.log(process.env)


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

const origin = process.env.NODE_ENV === "development" 
  ? "http://localhost:3000" 
  : "http://194.195.92.115"

app.use(express.json());
const allowedDomains = ["http://localhost:3000","http://localhost:3050","http://localhost:4200","http://localhost:4201","http://194.195.92.115"]
app.use(
  cors({
    origin:allowedDomains,
    credentials: true,
  })
);
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(file.filename)
  if(!file){
    const error = new Error("No File")
    error.status = 400
    return next(error);
  }
  res.status(200).json(file.filename);
});



app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser())

const db = require("./models");
const Role = db.role;
const User = db.user;
const UserRoles = db.user_roles;
const Pays = db.pays;
const Regions = db.regions;
const Departements = db.departements;
const Communes = db.communes;
const LieuVote = db.lieuvote;
const BureauDeVote = db.bureauvote;


var swaggerUi = require('swagger-ui-express'),
 swaggerDocument = require('./swagger.json');

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.get("/", (req, res) => res.send("Hello World! from home api"));

db.sequelize.sync({alter: true}).then(() => {
  console.log('Drop and Resync Db');
  //initial();
}); 

app.listen(5000, err => {
  console.log("Listening");
});

function initial() {
  Role.create({
    id: 1,
    name: "docteur"
  });
 
  Role.create({
    id: 2,
    name: "secretaire"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    id: 1,
    username: "vincent",
    adresse: "ouakam",
    email: "dioneousmanevincent@gmail.com",
    password: "$2a$16$2ob7rRE5JauIfv5vjfoy7uAvrasFWvVnqXMSmWu4MLSEZikZRxSkm",
    telephone:"771034559",
    isActive: true
  });

  User.create({
    id: 2,
    username: "prince",
    adresse: "ouakam",
    email: "prince@gmail.com",
    password: "$2a$16$2ob7rRE5JauIfv5vjfoy7uAvrasFWvVnqXMSmWu4MLSEZikZRxSkm",
    telephone:"771034558",
    isActive: true
  });

  User.create({
    id: 3,
    username: "malick",
    adresse: "ouakam",
    email: "malick@gmail.com",
    password: "$2a$16$2ob7rRE5JauIfv5vjfoy7uAvrasFWvVnqXMSmWu4MLSEZikZRxSkm",
    telephone:"771034557",
    isActive: true
  });

  UserRoles.create({
    userId: 3,
    roleId: 1
  })
 
  UserRoles.create({
    userId: 1,
    roleId: 3
  })

  UserRoles.create({
    userId: 2,
    roleId: 2
  })

  Pays.create({
    id:1,
    pays_name: 'SENEGAL',
    pays_description:'Senegal, pays de la teranga',
    pays_anneeElection:2019
  })

  Regions.create({
    id:1,
    reg_name:'DAKAR',
    reg_description:'DAKAR',
    payId:1
  })

  Regions.create({
    id:2,
    reg_name:'DIOURBEL',
    reg_description:'DIOURBEL',
    payId:1
  })

  Regions.create({
    id:3,
    reg_name:'FATICK',
    reg_description:'FATICK',
    payId:1
  })

  Regions.create({
    id:4,
    reg_name:'KAFFRINE',
    reg_description:'KAFFRINE',
    payId:1
  })

  Regions.create({
    id:5,
    reg_name:'KAOLACK',
    reg_description:'KAOLACK',
    payId:1
  })

  Regions.create({
    id:6,
    reg_name:'KEDOUGOU',
    reg_description:'KEDOUGOU',
    payId:1
  })

  Regions.create({
    id:7,
    reg_name:'KOLDA',
    reg_description:'KOLDA',
    payId:1
  })


  Regions.create({
    id:8,
    reg_name:'LOUGA',
    reg_description:'LOUGA',
    payId:1
  })

  Regions.create({
    id:9,
    reg_name:'MATAM',
    reg_description:'MATAM',
    payId:1
  })

  Regions.create({
    id:10,
    reg_name:'SAINT LOUIS',
    reg_description:'SAINT LOUIS',
    payId:1
  })

  Regions.create({
    id:11,
    reg_name:'SEDHIOU',
    reg_description:'SEDHIOU',
    payId:1
  })

  Regions.create({
    id:12,
    reg_name:'TAMBACOUNDA',
    reg_description:'TAMBACOUNDA',
    payId:1
  })

  Regions.create({
    id:13,
    reg_name:'THIES',
    reg_description:'THIES',
    payId:1
  })

  Regions.create({
    id:14,
    reg_name:'ZIGUINCHOR',
    reg_description:'ZIGUINCHOR',
    payId:1
  })


  Departements.create({
    id:1,
    dept_name:'DAKAR',
    dept_description:'DAKAR',
    regionId:1
  })

  Departements.create({
    id:2,
    dept_name:'GUEDIAWAYE',
    dept_description:'GUEDIAWAYE',
    regionId:1
  })

  Departements.create({
    id:3,
    dept_name:'PIKINE',
    dept_description:'PIKINE',
    regionId:1
  })

  Departements.create({
    id:4,
    dept_name:'RUFISQUE',
    dept_description:'RUFISQUE',
    regionId:1
  })

  Departements.create({
    id:5,
    dept_name:'BAMBEY',
    dept_description:'BAMBEY',
    regionId:2
  })

 Departements.create({
    id:6,
    dept_name:'DIOURBEL',
    dept_description:'DIOURBEL',
    regionId:2
  }) 

  Departements.create({
    id:7,
    dept_name:'MBACKE',
    dept_description:'MBACKE',
    regionId:2
  }) 


  Departements.create({
    id:8,
    dept_name:'FATICK',
    dept_description:'FATICK',
    regionId:3
  }) 


  Departements.create({
    id:9,
    dept_name:'FOUNDIOUGNE',
    dept_description:'FOUNDIOUGNE',
    regionId:3
  }) 

  Departements.create({
    id:10,
    dept_name:'GOSSAS',
    dept_description:'GOSSAS',
    regionId:3
  }) 

  Departements.create({
    id:11,
    dept_name:'BIRKILANE',
    dept_description:'BIRKILANE',
    regionId:3
  }) 

  Departements.create({
    id:12,
    dept_name:'KAFFRINE',
    dept_description:'KAFFRINE',
    regionId:4
  }) 


  Departements.create({
    id:13,
    dept_name:'KOUNGHEUL',
    dept_description:'KOUNGHEUL',
    regionId:4
  }) 


  Departements.create({
    id:13,
    dept_name:'MALEM HODAR',
    dept_description:'MALEM HODAR',
    regionId:4
  }) 

  Departements.create({
    id:14,
    dept_name:'GUINGUINEO',
    dept_description:'GUINGUINEO',
    regionId:5
  }) 

  Departements.create({
    id:15,
    dept_name:'KAOLACK',
    dept_description:'KAOLACK',
    regionId:5
  }) 

  Departements.create({
    id:16,
    dept_name:'NIORO DU RIP',
    dept_description:'NIORO DU RIP',
    regionId:5
  }) 


  Departements.create({
    id:17,
    dept_name:'KEDOUGOU',
    dept_description:'KEDOUGOU',
    regionId:6
  }) 

  Departements.create({
    id:18,
    dept_name:'SALEMATA',
    dept_description:'SALEMATA',
    regionId:6
  }) 

  Departements.create({
    id:19,
    dept_name:'SARAYA',
    dept_description:'SARAYA',
    regionId:6
  }) 

  Departements.create({
    id:20,
    dept_name:'KOLDA',
    dept_description:'KOLDA',
    regionId:7
  }) 

  Departements.create({
    id:21,
    dept_name:'MEDINA Y FOULAH',
    dept_description:'MEDINA Y FOULAH',
    regionId:7
  }) 


  Departements.create({
    id:22,
    dept_name:'VELINGARA',
    dept_description:'VELINGARA',
    regionId:7
  }) 

  Departements.create({
    id:23,
    dept_name:'KEBEMER',
    dept_description:'KEBEMER',
    regionId:8
  }) 

  Departements.create({
    id:24,
    dept_name:'LINGUERE',
    dept_description:'LINGUERE',
    regionId:8
  }) 

  Departements.create({
    id:25,
    dept_name:'LOUGA',
    dept_description:'LOUGA',
    regionId:8
  }) 

  Departements.create({
    id:25,
    dept_name:'KANEL',
    dept_description:'KANEL',
    regionId:9
  }) 


  Departements.create({
    id:26,
    dept_name:'MATAM',
    dept_description:'MATAM',
    regionId:9
  }) 


  Departements.create({
    id:27,
    dept_name:'RANEROU FERLO',
    dept_description:'RANEROU FERLO',
    regionId:10
  }) 


  Departements.create({
    id:28,
    dept_name:'DAGANA',
    dept_description:'DAGANA',
    regionId:10
  }) 

  Departements.create({
    id:29,
    dept_name:'PODOR',
    dept_description:'PODOR',
    regionId:10
  }) 


  Departements.create({
    id:30,
    dept_name:'SAINT LOUIS',
    dept_description:'SAINT LOUIS',
    regionId:10
  }) 

  Departements.create({
    id:31,
    dept_name:'BOUNKILING',
    dept_description:'BOUNKILING',
    regionId:11
  }) 

  Departements.create({
    id:32,
    dept_name:'GOUDOMP',
    dept_description:'GOUDOMP',
    regionId:11
  }) 

  Departements.create({
    id:33,
    dept_name:'SEDHIOU',
    dept_description:'SEDHIOU',
    regionId:11
  }) 

  Departements.create({
    id:34,
    dept_name:'BAKEL',
    dept_description:'BAKEL',
    regionId:12
  }) 

  Departements.create({
    id:35,
    dept_name:'GOUDIRY',
    dept_description:'GOUDIRY',
    regionId:12
  }) 

  Departements.create({
    id:36,
    dept_name:'KOUMPENTOUM',
    dept_description:'KOUMPENTOUM',
    regionId:12
  }) 

  Departements.create({
    id:37,
    dept_name:'TAMBACOUNDA',
    dept_description:'TAMBACOUNDA',
    regionId:12
  }) 

  Departements.create({
    id:38,
    dept_name:'MBOUR',
    dept_description:'MBOUR',
    regionId:13
  }) 


  Departements.create({
    id:39,
    dept_name:'THIES',
    dept_description:'THIES',
    regionId:13
  }) 


  Departements.create({
    id:40,
    dept_name:'TIVAOUANE',
    dept_description:'TIVAOUANE',
    regionId:13
  }) 


  Departements.create({
    id:41,
    dept_name:'BIGNONA',
    dept_description:'BIGNONA',
    regionId:14
  }) 

  Departements.create({
    id:42,
    dept_name:'OUSSOUYE',
    dept_description:'OUSSOUYE',
    regionId:14
  }) 

  Departements.create({
    id:43,
    dept_name:'ZIGUINCHOR',
    dept_description:'ZIGUINCHOR',
    regionId:14
  }) 


  // DAKAR
  Communes.create({
    id:1,
    com_name:'BISCUTERIE',
    com_description:'BISCUTERIE',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:2,
    com_name:'CAMBERENE',
    com_description:'CAMBERENE',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 


  Communes.create({
    id:3,
    com_name:'DIEUPPEUL DERKLE',
    com_description:'DIEUPPEUL DERKLE',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:4,
    com_name:'FANN POINT E AMITIE',
    com_description:'FANN POINT E AMITIE',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:5,
    com_name:'GOREE',
    com_description:'GOREE',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:6,
    com_name:'GRAND DAKAR',
    com_description:'GRAND DAKAR',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:7,
    com_name:'GRAND YOFF',
    com_description:'GRAND YOFF',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:8,
    com_name:'GUEULE TAPEE FASS CO',
    com_description:'GUEULE TAPEE FASS CO',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:9,
    com_name:'HLM',
    com_description:'HLM',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:10,
    com_name:'HANN BEL AIR',
    com_description:'HANN BEL AIR',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:11,
    com_name:'MEDINA',
    com_description:'MEDINA',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 
  
  Communes.create({
    id:12,
    com_name:'MERMOZ SACRE COEUR',
    com_description:'MERMOZ SACRE COEUR',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:13,
    com_name:'NGOR',
    com_description:'NGOR',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:14,
    com_name:'OUAKAM',
    com_description:'OUAKAM',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:15,
    com_name:'PARCELLES ASSAINIES',
    com_description:'PARCELLES ASSAINIES',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:16,
    com_name:"PATTES D'OIES",
    com_description:"PATTES D'OIES",
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:17,
    com_name:'PLATEAU',
    com_description:'PLATEAU',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:18,
    com_name:'SICAP LIBERTE',
    com_description:'SICAP LIBERTE',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:19,
    com_name:'YOFF',
    com_description:'YOFF',
    departementId:1,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  // GUEDIAWAYE

  Communes.create({
    id:20,
    com_name:'GOLF SUD',
    com_description:'GOLF SUD',
    departementId:2,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:21,
    com_name:'MEDINA GOUNASS',
    com_description:'MEDINA GOUNASS',
    departementId:2,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:22,
    com_name:'NDIAREM',
    com_description:'NDIAREM',
    departementId:2,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:23,
    com_name:'SAM',
    com_description:'SAM',
    departementId:2,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

  Communes.create({
    id:24,
    com_name:'WAKHINANE NIMZAT',
    com_description:'WAKHINANE NIMZAT',
    departementId:2,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0 
  }) 

// PIKINE
  Communes.create({
    id:25,
    com_name:'DALIFORT',
    com_description:'DALIFORT',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:26,
    com_name:'DIAMAGUENE SICAP MBAO',
    com_description:'DIAMAGUENE SICAP MBAO',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:27,
    com_name:'DJIDA THIAROYE KAO',
    com_description:'DJIDA THIAROYE KAO',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:28,
    com_name:'GUINAW RAIL NORD',
    com_description:'GUINAW RAIL NORD',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:29,
    com_name:'GUINAW RAIL SUD',
    com_description:'GUINAW RAIL SUD',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:30,
    com_name:'KEUR MASSAR',
    com_description:'KEUR MASSAR',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:31,
    com_name:'MALIKA',
    com_description:'MALIKA',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:32,
    com_name:'MBAO',
    com_description:'MBAO',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:33,
    com_name:'PIKINE EST',
    com_description:'PIKINE EST',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:34,
    com_name:'PIKINE NORD',
    com_description:'PIKINE NORD',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:35,
    com_name:'PIKINE OUEST',
    com_description:'PIKINE OUEST',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:36,
    com_name:'THIAROYE GARE',
    com_description:'THIAROYE GARE',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:37,
    com_name:'THIAROYE SUR MER',
    com_description:'THIAROYE SUR MER',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:38,
    com_name:'TIVAOUANE DIAKSAO',
    com_description:'TIVAOUANE DIAKSAO',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:39,
    com_name:'YEUMBEUL NORD',
    com_description:'YEUMBEUL NORD',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:40,
    com_name:'YEUMBEUL SUD',
    com_description:'YEUMBEUL SUD',
    departementId:3,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  //RUFISQUE
  Communes.create({
    id:41,
    com_name:'BAMBILOR',
    com_description:'BAMBILOR',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:42,
    com_name:'BARGNY',
    com_description:'BARGNY',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:43,
    com_name:'DIAMNIADIO',
    com_description:'DIAMNIADIO',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:44,
    com_name:'JAXAAY-PLLES-NIAKOUL RAB',
    com_description:'JAXAAY-PLLES-NIAKOUL RAB',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:45,
    com_name:'RUFISQUE EST',
    com_description:'RUFISQUE EST',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:46,
    com_name:'RUFISQUE NORD',
    com_description:'RUFISQUE NORD',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:47,
    com_name:'RUFISQUE OUEST',
    com_description:'RUFISQUE OUEST',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:48,
    com_name:'SANGALKAM',
    com_description:'SANGALKAM',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:49,
    com_name:'SEBIKOTANE',
    com_description:'SEBIKOTANE',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:50,
    com_name:'SENDOU',
    com_description:'SENDOU',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:51,
    com_name:'TIVAOUANE PEULH - NIAGA',
    com_description:'TIVAOUANE PEULH - NIAGA',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:52,
    com_name:'YENE',
    com_description:'YENE',
    departementId:4,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  //DIOURBEL, BAMBEY

  Communes.create({
    id:53,
    com_name:'BABA GARAGE',
    com_description:'BABA GARAGE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:54,
    com_name:'BAMBEY',
    com_description:'BAMBEY',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:55,
    com_name:'DANGALMA',
    com_description:'DANGALMA',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:56,
    com_name:'DINGUIRAYE',
    com_description:'DINGUIRAYE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:57,
    com_name:'GAWANE',
    com_description:'GAWANE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:58,
    com_name:'KEUR SAMBA KANE',
    com_description:'KEUR SAMBA KANE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:59,
    com_name:'LAMBAYE',
    com_description:'LAMBAYE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 
  Communes.create({
    id:60,
    com_name:'NDONDOL',
    com_description:'NDONDOL',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:61,
    com_name:'NGOGOM',
    com_description:'NGOGOM',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:62,
    com_name:'NGOYE',
    com_description:'NGOYE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:63,
    com_name:'REFANE',
    com_description:'REFANE',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:64,
    com_name:'THIAKHAR',
    com_description:'THIAKHAR',
    departementId:5,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  // DIOURBEL, DIOURBEL

  Communes.create({
    id:64,
    com_name:'DANKH SENE',
    com_description:'DANKH SENE',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:65,
    com_name:'DIOURBEL',
    com_description:'DIOURBEL',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:66,
    com_name:'GADE ESCALE',
    com_description:'GADE ESCALE',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:67,
    com_name:'KEUR NGALKOU',
    com_description:'KEUR NGALKOU',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:68,
    com_name:'NDINDY',
    com_description:'NDINDY',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:69,
    com_name:'NDOULO',
    com_description:'NDOULO',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:70,
    com_name:'NGOHE',
    com_description:'NGOHE',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:71,
    com_name:'PATTAR',
    com_description:'PATTAR',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:72,
    com_name:'TAIBA MOUTOUPHA',
    com_description:'TAIBA MOUTOUPHA',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:73,
    com_name:'TOCKY GARE',
    com_description:'TOCKY GARE',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:74,
    com_name:'TOUBA LAPPE',
    com_description:'TOUBA LAPPE',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:75,
    com_name:'TOURE MBONDE',
    com_description:'TOURE MBONDE',
    departementId:6,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  //DIOURBEL MBACKE

  Communes.create({
    id:76,
    com_name:'DALLA NGABOU',
    com_description:'DALLA NGABOU',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:77,
    com_name:'DANDEYE GOUYGUI',
    com_description:'DANDEYE GOUYGUI',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:78,
    com_name:'DAROU NAHIM',
    com_description:'DAROU NAHIM',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:79,
    com_name:'DAROU SALAM TYP',
    com_description:'DAROU SALAM TYP',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:80,
    com_name:'KAEL',
    com_description:'KAEL',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:81,
    com_name:'MADINA',
    com_description:'MADINA',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:82,
    com_name:'MBACKE',
    com_description:'MBACKE',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 



  Communes.create({
    id:83,
    com_name:'MISSIRA (MBACKE)',
    com_description:'MISSIRA (MBACKE)',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


  Communes.create({
    id:84,
    com_name:'NDIOUMANE',
    com_description:'NDIOUMANE',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:85,
    com_name:'NGHAYE ',
    com_description:'NGHAYE',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:86,
    com_name:'SADIO ',
    com_description:'SADIO',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:87,
    com_name:'TAIBA THIEKENE ',
    com_description:'TAIBA THIEKENE',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:88,
    com_name:'TAIF ',
    com_description:'TAIF',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:89,
    com_name:'TOUBA FALL ',
    com_description:'TOUBA FALL',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:90,
    com_name:'TOUBA MBOUL ',
    com_description:'TOUBA MBOUL',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 

  Communes.create({
    id:91,
    com_name:'TOUBA MOSQUEE ',
    com_description:'TOUBA MOSQUEE',
    departementId:7,
    com_nombreElecteurs:0,
    com_nombreLieuxDeVote:0
  }) 


// FATICK FATICK

Communes.create({
  id:92,
  com_name:'DIAKHAO',
  com_description:'DIAKHAO',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:93,
  com_name:'DIAOULE',
  com_description:'DIAOULE',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:94,
  com_name:'DIARRERE',
  com_description:'DIARRERE',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:95,
  com_name:'DIOFIOR',
  com_description:'DIOFIOR',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:96,
  com_name:'DIOUROUP',
  com_description:'DIOUROUP',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:97,
  com_name:'DJILASS',
  com_description:'DJILASS',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:98,
  com_name:'FATICK',
  com_description:'FATICK',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:99,
  com_name:'FIMELA',
  com_description:'FIMELA',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:100,
  com_name:'LOUL SESSENE',
  com_description:'LOUL SESSENE',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:101,
  com_name:'MBELLACADIAO',
  com_description:'MBELLACADIAO',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:102,
  com_name:'NDIOB',
  com_description:'NDIOB',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:103,
  com_name:'NGAYOKHEME',
  com_description:'NGAYOKHEME',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:104,
  com_name:'NIAKHAR',
  com_description:'NIAKHAR',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:105,
  com_name:'PALMARIN FACAO',
  com_description:'PALMARIN FACAO',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:106,
  com_name:'PATAR',
  com_description:'PATAR',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:107,
  com_name:'TATTAGUINE',
  com_description:'TATTAGUINE',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:108,
  com_name:'THIARE NDIALGUI',
  com_description:'THIARE NDIALGUI',
  departementId:8,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

//FATICK FOUNDIOUNE

Communes.create({
  id:109,
  com_name:'BASSOUL',
  com_description:'BASSOUL',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:110,
  com_name:'DIAGANE BARKA',
  com_description:'DIAGANE BARKA',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:111,
  com_name:'DIONEWAR',
  com_description:'DIONEWAR',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:112,
  com_name:'DIOSSONG',
  com_description:'DIOSSONG',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:113,
  com_name:'DJILOR',
  com_description:'DJILOR',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:114,
  com_name:'NDJIRNDA',
  com_description:'NDJIRNDA',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:115,
  com_name:'FOUNDIOUGNE',
  com_description:'FOUNDIOUGNE',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:116,
  com_name:'KARANG POSTE',
  com_description:'KARANG POSTE',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:117,
  com_name:'KEUR SALOUM DIANE',
  com_description:'KEUR SALOUM DIANE',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:118,
  com_name:'KEUR SAMBA GUEYE',
  com_description:'KEUR SAMBA GUEYE',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:119,
  com_name:'MBAM',
  com_description:'MBAM',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:120,
  com_name:'NIASSENE',
  com_description:'NIASSENE',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:121,
  com_name:'NIORO ALASSANE TALL',
  com_description:'NIORO ALASSANE TALL',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:122,
  com_name:'PASSI',
  com_description:'PASSI',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:123,
  com_name:'SOKONE',
  com_description:'SOKONE',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:124,
  com_name:'SOUM',
  com_description:'SOUM',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 

Communes.create({
  id:125,
  com_name:'TOUBACOUTA',
  com_description:'TOUBACOUTA',
  departementId:9,
  com_nombreElecteurs:0,
  com_nombreLieuxDeVote:0
}) 




}