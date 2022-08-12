module.exports = (sequelize, Sequelize) => {
	return sequelize.define('user', {
		email: {
			type: Sequelize.STRING(50),
			allowNull: false,
			unique: true
		}, 
		nick: {
			type: Sequelize.STRING(30),
			allowNull: true,
			unique: true,
			defaultValue: ""
		},
		password: {
			type: Sequelize.STRING(200),
			allowNull: true
		}
	}, {
		timestamps: true,
		paranoid: true
	})
}