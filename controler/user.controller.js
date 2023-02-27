
const db = require("../models");
const User = db.user;
const Role = db.role;
const Post = db.post;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
const crypto = require("crypto");

var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");




const removeOne = async(req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if(!deleted) {
            return res.status(404).json({
                message: "User non trouvé",
                success: false,
            });
        }
        return res.status(204).json({
            message: "Utilisateur supprimé avec success",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};



const updateOne = async(req, res) => {
    try {
      const id = req.body.id;
      console.log("--------------------------------");
      console.log(JSON.stringify(req.body));
      console.log(id);
      console.log("--------------------------------");

      const user = await User.findOne({ where: { [Op.or]: [{id: req.body.id}] } });
      console.log("--------------|||||||||||||||||||||||||||||||||||||||||||||||||||||||------------------");
      console.log(user)

        await User.update(req.body, {
            where: { id: id }
          });
        return res.status(201).json({
            message: "User modifié",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: "username,email et telephone doivent etre unique",
            success: false,
        });
    }
};


const updateImg = async(req, res) => {
  try {
    const id = req.params.id;
    console.log("-----------OKKKKKKKK---------------------");
    console.log(JSON.stringify(req.body.img[0]));
    console.log(req.body.img[0]);
    console.log("-------------OKKKKKK-------------------");


      await User.update({
        img:  req.body.img[0],
      }, {
        where: { id:id },
        returning: true,
        plain: true
      });
      return res.status(201).json({
          message: "Image modifiée",
          success: true,
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};

const blockOne = async(req, res) => {
  try {
    console.log(" ============================== == unblocked  ============================================================= ")
      await User.update({
        isActive: 1
      },
      {
        where: { id: req.params.id },
      });
      return res.status(201).json({
          message: "Utilisateur activé",
          success: true,
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};

const unBlockOne = async(req, res) => {
  try {

    console.log(" ============================== == Blocked  ============================================================= ")
      await User.update({
        isActive: 0
      },
      {
        where: { id: req.params.id },
      });
      return res.status(201).json({
          message: "Utilisateur desactivé",
          success: true,
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};


const addOne = async(data, res) => {
  try {
    console.log(" ============================== ==  ============================================================= ")
    console.log("user == "+JSON.stringify(data));
    console.log(" ============================== ==  ============================================================= ")
    console.log("password == "+JSON.stringify(data.password));

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
      await User.create({
        ...data,
        password: hashedPassword,
    })
    .then(user => {
      if (data.roles) {
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrr---------------------------rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        console.log(data.roles);

        Role.findAll({
          where: {
            name: {
              [Op.or]: [data.roles]
            }
          }
        }).then(r => {
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
          console.log(r);
          user.setRoles(r).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!",user:user });
        });
      }
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

    /*   await User.create({
          ...data
      })
      .then((p)=>{
          return res.status(201).json({
              message: "User ajouté avec success",
              success: true
          });
      })
      return res.status(201).json({
          message: "User ajouté avec success",
          success: true
      }); */
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};


const getUsers = async(req, res) => {
    try {
        const item = await User.findAll(
         { include:[
            { model: db.role, as: 'roles'},
         ],
         attributes: {
             exclude: ['password']
          }}
        );
        if(item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const getCountPosts = async(req, res) => {
  try {
      const item = await User.findAll(
       { include:[
          { model: db.role, as: 'roles'},
       ],
       attributes: {
           exclude: ['password']
        }}
      );
      if(item) {
          return res.status(200).json(item);
      }
      return res.status(404).json({
          message: "Item not found",
          success: false,
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};

const getRoles = async(req, res) => {
  try {
      const item = await Role.findAll();
      if(item) {
          return res.status(200).json(item);
      }
      return res.status(404).json({
          message: "Item not found",
          success: false,
      });
  } catch(err) {
      return res.status(500).json({
          message: err.message,
          success: false,
      });
  }
};


const getAll = async(req, res) => {
    try {
        const [results, itemCount] = await
        Promise.all([
            User.find({}) 
                .sort({createdAt: -1})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                User.count({}),
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        return res.status(201).json({
            object: "list",
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results,
            pageCount,
            itemCount,
            currentPage: req.query.page,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const getOne = async(req, res) => {
    try {
      console.log("=----------------=-----------")
        const item = await User.findByPk(req.params.id, { include:[
          { model: db.role, as: 'roles'},
       ],
       attributes: {
           exclude: ['password','passwordResetCode','isEmailVerified','verificationCode','createdAt','updatedAt']
        }});
        if(item) {
            console.log("user"+JSON.stringify(item));
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};



const subscribe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      next(err);
    }
  };
  
const unsubscribe = async (req, res, next) => {
    try {
      try {
        await User.findByIdAndUpdate(req.user.id, {
          $pull: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
          $inc: { subscribers: -1 },
        });
        res.status(200).json("Unsubscription successfull.")
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  };
  
  
const like = async (req, res, next) => {
  
    const id = req.user.id;
    const PostId = req.params.PostId;
    try {
      await Post.findByIdAndUpdate(PostId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      })
      res.status(200).json("The Post has been liked.")
    } catch (err) {
      next(err);
    }
  };
  
const dislike = async (req, res, next) => {
      const id = req.user.id;
      const PostId = req.params.PostId;
      try {
        await Post.findByIdAndUpdate(PostId,{
          $addToSet:{dislikes:id},
          $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
      next(err);
    }
  };


  const changePassword = async (req, res) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, config.secret, async (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      console.log(userInfo)

      const values = [
        userInfo.user_id,
        userInfo.role
      ];

      
      try { 
        let { password, newpassword } = req.body;
        const user = await User.findByPk(userInfo.user_id);
        console.log("first"+user)
        let isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            const hashedPassword = await bcrypt.hash(newpassword, 16);
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

    });

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
  

module.exports = {
    removeOne,
    updateOne,
    getAll,
    getOne,
    getUsers,
    addOne,
    getRoles,
    blockOne,
    unBlockOne,
    updateImg,
    changePassword
}

