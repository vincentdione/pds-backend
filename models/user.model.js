module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
   
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    dateNaissance: {
      type: Sequelize.STRING,
      allowNull: true,

    },
    adresse: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prenom: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    telephone:{
      type: Sequelize.STRING,
      unique: true
    },
    telephone2:{
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING
    }, 
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    img: {
      type: Sequelize.STRING,
    },
    verificationCode: {
      type: Sequelize.INTEGER,
  },
  isEmailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
  },
  passwordResetCode: {
      type: Sequelize.STRING,
  } 
  ,
  termConditions: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
  }
  });

  return User;
};
