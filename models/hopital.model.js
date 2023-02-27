module.exports = (sequelize, Sequelize) => {
  const Hopital = sequelize.define("hopital", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hop_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    hop_adresse: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    hop_numeroContact: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    hop_prix: {
      type: Sequelize.STRING,
      allowNull: true,
    },

  });

  return Hopital;
};
