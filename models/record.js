module.exports = (sequelize, Sequelize) => {
	return sequelize.define('record', {
		turnId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		lender: {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: null
		},
		borrower: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
	},{
		timestamps: true,
		paranoid: true
	})
}