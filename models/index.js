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

db.cadres = require("../models/cadres.model.js")(sequelize, Sequelize);


db.pays = require("../models/pays.model.js")(sequelize,Sequelize);
db.regions = require("../models/regions.model.js")(sequelize,Sequelize);
db.departements = require("../models/departements.model.js")(sequelize,Sequelize);
db.communes = require("../models/communes.model.js")(sequelize,Sequelize);
db.lieuvote = require("../models/lieuvote.model.js")(sequelize,Sequelize);
db.bureauvote = require("../models/bureauvote.model.js")(sequelize,Sequelize);





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

db.cadres.belongsTo(db.user);


db.pays.hasMany(db.regions);
db.regions.belongsTo(db.pays);

db.regions.hasMany(db.departements);
db.departements.belongsTo(db.regions);

db.departements.hasMany(db.communes);
db.communes.belongsTo(db.departements);

db.communes.hasMany(db.lieuvote);
db.lieuvote.belongsTo(db.communes);

db.communes.hasMany(db.bureauvote);
db.bureauvote.belongsTo(db.communes);


module.exports = db;
