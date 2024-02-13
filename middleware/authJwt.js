const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1].replace(/^"(.*)"$/, '$1');

  console.log("----------------------------------------------------------------");
  console.log("Request Headers: ", JSON.stringify(req.headers));
  console.log("Token from Authorization Header: ", token);

  const access_token = req.body.token || req.query.token || req.headers.authorization;
  console.log("Token from other sources (body, query, headers): ", access_token);

  if (!token) {
    console.log("No token provided!");
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      console.log("Unauthorized: Session expired!");
      console.error(err);
      return res.status(401).send({
        message: "Votre session a expiré!"
      });
    }
    req.user = user;
    console.log("Token successfully verified.");
    next();
  });
};

module.exports = verifyToken;



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
