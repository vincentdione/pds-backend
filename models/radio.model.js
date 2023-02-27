module.exports = (sequelize, Sequelize) => {
  const Radio = sequelize.define("Radios", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rad_titre: {
      type: Sequelize.STRING
    },
    rad_description: {
      type: Sequelize.STRING
    },
    rad_interpretation: {
      type: Sequelize.STRING
    },
    rad_img: {
      type: Sequelize.STRING
    },
    rad_status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    rad_prix: {
      type: Sequelize.STRING,
      allowNul: true,
    },

  });

  return Radio;
};
