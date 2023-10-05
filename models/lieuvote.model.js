module.exports = (sequelize, Sequelize) => {
    
  const LieuDeVote = sequelize.define('LieuDeVote', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    lieu_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lieu_adresse: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
   return LieuDeVote
  };
  