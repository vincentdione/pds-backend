const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.PGDATABASE || config.DB,
  process.env.PGUSER || config.USER,
  process.env.PGPASSWORD || config.PASSWORD,
  {
    host: process.env.PGHOST || config.HOST,
    port: process.env.PGPORT || config.PORT,
    dialect:config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

sequelize.sync().then(function(){
  console.log('DB connection sucessful.');
}, function(err){
  // catch error here
  console.log(err);

});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.user_roles = require("../models/user_roles.model.js")(sequelize, Sequelize);

db.patient = require("../models/patient.model.js")(sequelize, Sequelize);
db.hopital = require("../models/hopital.model.js")(sequelize, Sequelize);
db.radio = require("../models/radio.model.js")(sequelize, Sequelize);






db.role.belongsToMany(db.user, {
  through: db.user_roles,
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: db.user_roles,
  foreignKey: "userId",
  otherKey: "roleId"
});


/* db.user.belongsTo(db.radio, {
  foreignKey: "userId",
  as: "user",
});
 */
db.radio.belongsTo(db.user, {as: 'secretaire'});
db.radio.belongsTo(db.user, {as: 'docteur'});
db.radio.belongsTo(db.patient);
db.radio.belongsTo(db.hopital);

/* include: [{
  model: db.employee,
  as: 'SupervisorId
}]
 */






db.ROLES = ["docteur", "secretaire","admin"];











module.exports = db;
