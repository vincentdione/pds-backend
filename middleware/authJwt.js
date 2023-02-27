const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  const authHeaders = req.headers['authorization']
  //let token = req.cookies.access_token;
  const token = authHeaders && authHeaders.split(' ')[1] 
  console.log("----------------------------------------------------------------")
  console.log(JSON.stringify(req.headers));
  console.log("----------------------------------------------------------------")

  const access_token = req.body.token || req.query.token || req.headers.authorization;


  var valueToken = token
  console.log("first+token"+valueToken);


  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(valueToken, config.secret, (err, user) => {
    if (err) {
      console.log("first Unauthorized")
      console.log(err)
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.user = user;
    next();
  });
};


verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,() =>{
      console.log(req)
      let id = req.user.user_id
      let par = req.params.id
      if (id === par ) {
        next();
      }
      else{
        return res.status(403).send({
          message: "Unauthorized!"
        });
      }
    })
}

isAdmin = (req,res,next)=>{
  verifyToken(req,res,() =>{
    console.log(req.user.role)
    if (req.user.role[0] === 'ROLE_ADMIN') {
      next();
    }
    else{
      return res.status(403).send({
        message: "Unauthorized!"
      });
    }
  })
}

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  verifyUser: verifyUser,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
