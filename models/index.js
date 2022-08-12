const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(db.sequelize, db.Sequelize)
db.Turn = require('./turn')(db.sequelize, db.Sequelize)
db.Waitlist = require('./waitlist')(db.sequelize, db.Sequelize)
db.Record = require('./record')(db.sequelize, db.Sequelize)

db.User.hasMany(db.Turn)
db.Turn.belongsTo(db.User)

db.User.belongsToMany(db.User, {
	through: 'Follow',
	as: 'Followings',
	foreignKey: 'followerId'
})

db.User.belongsToMany(db.User, {
	through: 'Follow',
	as: 'Followers',
	foreignKey: 'followingId'
})


module.exports = db;
