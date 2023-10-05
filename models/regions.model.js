module.exports = (sequelize, Sequelize) => {
  const Regions = sequelize.define("regions", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    reg_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    reg_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Regions;
};
