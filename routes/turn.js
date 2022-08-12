const express = require('express')
const {Turn, Record, User} = require('../models')
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const router = express.Router()
const compareDate = require('../utilities/compares.js')

router.post('/', isLoggedIn, async (req, res, next) => {
	try {
		const {year, month, day} = req.body
		console.log(year)
		if (parseInt(month) > 12 || parseInt(month) < 1 || parseInt(day) > 31 || parseInt(day) < 1) {
			req.flash('dateError', 'You are trying to pick a weird date')
			return res.redirect('/turn')
		}
		const date = year.toString() + '-' + month.toString() + '-' + day.toString()
		const userId = req.user.id
		if (!compareDate(date, new Date().toISOString())) {
			req.flash('dateError', 'You are trying to register an old date')
			return res.redirect('/turn')
		} else {
			var turn = await Turn.create({
				date: date,
				userId: userId,
			})
			
			if (turn) {
				const turnId = turn.id
				var record = await Record.create({
					turnId: turnId,
					lender: null,
					borrower: userId
				})
				return res.redirect('/turn')
			} else {
				req.flash('createError', "Something has gone wrong... report this error")
				return res.redirect('/turn')
			}
		}
	} catch(e) {
		console.error(e)
		next(e)
	}
})

//a middleware to send turn swap request where id in '/:id' is a turn id.
router.post('/:id/request', isLoggedIn, async (req, res, next) => {
	
})

router.get('/', isLoggedIn, async (req, res, next) => {
	try {
		const userId = req.user.id
		const myTurns = await Turn.findAll({
			include: [{
				model: User,
				as: 'user',
				attributes: ['id', 'nick'],
				where: {id: userId}
			}],
			where: {
				userId: userId
			}
		})
		res.render('myturn', {
			turns: myTurns
		})
		
	} catch (e) {
		console.error(e)
		next(e)
	}
})

module.exports = router