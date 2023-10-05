module.exports = (sequelize, Sequelize) => {
  const Pays = sequelize.define("pays", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pays_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    pays_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pays_anneeElection: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
   
   
  });

  return Pays;
};
