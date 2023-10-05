module.exports = (sequelize, Sequelize) => {
  const Communes = sequelize.define("communes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    com_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    com_description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    com_nombreElecteurs: {
      type: Sequelize.INTEGER,
    },
    com_nombreLieuxDeVote: {
      type: Sequelize.INTEGER,
    }
   
  });

  return Communes;
};
