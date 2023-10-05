module.exports = (sequelize, Sequelize) => {
  const Departements = sequelize.define("departements", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dept_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    dept_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
   
   
  });

  return Departements;
};
