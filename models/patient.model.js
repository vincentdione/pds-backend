module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patients", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },   
    pat_email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    pat_dateNaissance: {
      type: Sequelize.STRING,
    },
    pat_adresse: {
      type: Sequelize.STRING,
    },
    pat_nom: {
      type: Sequelize.STRING,
    },
    pat_prenom: {
      type: Sequelize.STRING,
    },
    pat_telephone:{
      type: Sequelize.STRING,
      unique: true
    },
    pat_telephone2:{
      type: Sequelize.STRING,
      allowNull: true,
      unique: true   
     }
  });

  return Patient;
};
