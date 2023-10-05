
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { welcomeSender, forgotPasswordSender } = require("../mailers/senders");
const nodemailer = require("nodemailer");







const register = async (data,res) =>{

    try {
        const userEmail = await validateEmail(data.email)
        if(userEmail) {
            return res.status(400).json({
                username: "Email existe deja",
                message: "Erreur lors de l'Inscription",
                success: false,
            });
        }
        const userUsername = await validateUsername(data.username)
        if(userUsername) {
            return res.status(400).json({
                username: "Username existe deja",
                message: "Changer de username ",
                success: false,
            });
        }
         const userTelephone = await validateTelephone(data.telephone)
        if(userTelephone) {
            return res.status(400).json({
                username: "Numero de téléphone existe deja",
                message: "Changer de numéro ",
                success: false,
            });
        }
 
        const hashedPassword = await bcrypt.hash(data.password, 16);
        const code = crypto.randomInt(1000, 10000);
        console.log("------------CODE------------")
        console.log(code)
        console.log("------------CODE------------")
        console.log(data)
        await User.create({
            ...data,
            password: hashedPassword,
            verificationCode:code,
            isActive: true
        })
        .then(user => {
            user.setRoles([1]).then(() => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!"+user)
                res.send({ message: "User was registered successfully!",user:user });
              });
        })
          .catch(err => {
            res.status(500).send({ message: err.message });
            console.log("heyyyyyy error"+err);
          });

        

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }

}


const login = async (data, res) => {
  try {
      let { username,password } = data;
      console.log("--------------------")
      console.log(data)
     /*  const username = data.data.username
      const password = data.data.password */

      
      const user = await User.findOne({ where: { [Op.or]: [{email: username}, {username: username},{telephone: username}] } });

      if(!user.isActive){
        res.status(404).json({
            message: "Utilisateur est désactivé",
            success: false,
        })
      return
      }
      
      if(!user) {
          res.status(404).json({
              message: "Username ou password incorrect",
              username: "Email ou username incorrect",
              success: false,
          })
        return
      }
      let isMatch = await bcrypt.compare(password, user.password);
      console.log("----------------------"+isMatch)
      if(isMatch) {
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          let token = jwt.sign({
            user_id: user.id,
            role: authorities,
        }, 
        config.secret,{expiresIn: '8h'} );

        let result = {
            token: token,
            user:user,
            role: authorities
        };
          res.cookie("token",token,{
              httpOnly:true,
          }).status(200).send({
            ...result,
            message: "Login success",
            success: true
          });
        });
         
      } else {
          return res.status(403).json({
              message: "Failed login attempt",
              email: "Incorrect password",
              success: false
          })
      }
  } catch(err) {
    console.log(err)
      return res.status(500).json({
          message: err.message,
          success: false
      })
  }
  
};

const verify = async (data, res) => {
    console.log(" === "+JSON.stringify(data.verificationCode))
    console.log(data)
    let  code  = JSON.stringify(parseInt(data.verificationCode))
    console.log(code)
  try { 
      
      const user = await User.findOne( {where : { verificationCode: JSON.stringify(parseInt(data.verificationCode)) }});
      console.log("----------------------------------------------------")
      console.log(user)
      console.log("----------------------------------------------------")
      if(!user) {
          return res.status(404).json({
              message: "votre code est invalide",
              success: false
          }); 
      } else if(user.isEmailVerified) {
          return res.status(404).json({
              message: "Votre email a été déja vérifié",
              success: false
          }); 
      }
      await user.update ({ isEmailVerified: true}, {where: { verificationCode: code }});
      return res.status(201).json({
          message: "verification de votre email réussie!!",
          success: true
      }); 
  } catch (err) {
      
      return res.status(500).json({
          message: err.message,
          success: false
      })
  }
};

const forgotPassword = async (data, res) => {
  try { 
      let { email } = data;
      const user = await User.findOne( {where : { email: email }});
      if(!user) {
          return res.status(404).json({
              message: "L'email est invalide",
              success: false
          }); 
      }

      const code = crypto.randomInt(100000, 1000000);
      const passwordResetCode = await bcrypt.hash(code.toString(), 16);
      await user.update({passwordResetCode : passwordResetCode});
      forgotPasswordSender(user.email, user.username, code);
      return res.status(200).json({
          message: "Votre code a été envoyé dans votre boite email",
          success: true,
      }); 
  } catch (err) {
      return res.status(500).json({
          message: err.message,
          success: false
      })
  }
};


const resetPassword = async (data, res) => {
  try { 
      console.log(data)
      let { email, code, newPassword } = data;
      const user = await User.findOne( {where: { email: email }});
      if(!user) {
          return res.status(404).json({
              message: "L'email est invalide",
              success: false
          }); 
      }
      console.log("-------------------------------")
      console.log(user)
      let isMatch = await bcrypt.compare(code.toString(), user.passwordResetCode);
      if(isMatch) {
          const hashedPassword = await bcrypt.hash(newPassword, 16);
          await user.update({password: hashedPassword}, {passwordResetCode: ""});
          return res.status(201).json({
              message: "Votre mot de passe a été modifié avec success",
              success: true
          }); 
      } else {
          return res.status(404).json({
              message: "Votre code est invalide",
              success: false
          }); 
      }
  } catch (err) {
      return res.status(500).json({
          message: err.message,
          success: false
      })
  }
};

const changePassword = async (data,req, res) => {
  try { 
      let { oldPassword, newPassword } = data;
      const user = await User.findByPk(req.user.id);
      console.log("first"+user)
      let isMatch = await bcrypt.compare(oldPassword, user.password);
      if(isMatch) {
          const hashedPassword = await bcrypt.hash(newPassword, 16);
          await user.update({password: hashedPassword});
          console.log("ok matched")
          return res.status(201).json({
              message: "Votre mot de passe a été modifié avec success",
              success: true
          }); 
      } else {
          return res.status(404).json({
              message: "Votre ancien mot de passe est incorrect",
              success: false
          }); 
      }
  } catch (err) {
      console.log("err"+err)
      return res.status(500).json({
          message: err.message,
          success: false
      })
  }
};

const reSendCode = async (data,req, res) => {

    let user = await User.findOne({ where: { telephone: telephone } });
    if(user) {
        return true;
    } else {
        return false;
    }
  
};








const validateEmail = async (email) => {
    let user = await User.findOne({ where: { email: email } });
    if(user) {
        return true;
    } else {
        return false;
    }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ where: { username: username } });
  if(user) {
      return true;
  } else {
      return false;
  }
};

const validateTelephone = async (telephone) => {
  let user = await User.findOne({ where: { telephone: telephone } });
  if(user) {
      return true;
  } else {
      return false;
  }
};

 const logout = (req, res) => {
    res.clearCookie("access_token",{
      secure:true,
      sameSite:"none"
    }).status(200).json("User has been logged out.")
  };

  const checkToken = (req, res) => {
    res.status(200).json({message : true})
  };


  var transport = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user : process.env.USERNAME,
        pass : process.env.PASSWORD
    }
  });

  var mailOptions = {
    from : process.env.USERNAME,
    to : "",
    subject : "",
    html :"<p><a href='http://localhost:4200'></a></p>"
 }

  transport.sendMail(mailOptions,function (error,info){

  })

 

module.exports ={
  register,
  login,
  verify,
  changePassword,
  resetPassword,
  forgotPassword,
  logout,
  checkToken
}
