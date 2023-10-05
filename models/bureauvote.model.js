module.exports = (sequelize, Sequelize) => {
    
  const BureauDeVote = sequelize.define('BureauDeVote', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bureau_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
   return BureauDeVote
  };
  