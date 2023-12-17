module.exports = (sequelize, Sequelize) => {
    const Langues = sequelize.define("langues", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      libelle: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

     
    });
  
    return Langues;
  };
  