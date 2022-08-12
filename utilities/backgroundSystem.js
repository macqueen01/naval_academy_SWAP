const compareDate = require('./compares')
const { Turn, User } = require('../models')
const { Op } = require('../models').Sequelize

//checks if any turn has expired and if so, delete from turns table
async function expirationCheck() {
	var currentDate = new Date().toISOString()
	var allTurns = await Turn.findAll({})
	console.log('expired cards...')
	for (let i = 0; i < allTurns.length; i++) {
		var date = allTurns[i].dataValues.date
		if (!compareDate(date, currentDate)) {
			console.log(allTurns[i].dataValues.date)
			await allTurns[i].destroy()
		}
	}
}

module.exports = expirationCheck