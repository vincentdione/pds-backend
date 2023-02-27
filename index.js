
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
    cb(null, "../senRadio/src/assets/uploads");
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

/* app.delete("/api/upload/delete", (req, res) => {
  // Remove old photo
  var oldPhoto = req.rad_img
  if (oldPhoto) {
    const oldPath = path.join(__dirname, "../uploads", "images", oldPhoto);
    if (fs.existsSync(oldPath)) {
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        res.status(200).send(userObj);
      });
    }
  }
}) */

app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser())

const db = require("./models");
const Role = db.role;
const User = db.user;
const UserRoles = db.user_roles;
const country = db.country;


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
}