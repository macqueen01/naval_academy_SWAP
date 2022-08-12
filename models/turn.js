module.exports = (sequelize, Sequelize) => {
	return sequelize.define('turn', {
		date: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
	}, {
		timestamps: true,
		paranoid: true
	})
}