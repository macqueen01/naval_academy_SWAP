const express = require('express')
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const passport = require('passport')
const User = require('../models').User
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/join', isNotLoggedIn, async (req, res, next) => {
	const {email, nick, password} = req.body
	
	try {
		const user = await User.findOne({
			where: {email : email}
		})
		
		if (user) {
			req.flash('joinError', 'This artist is already with us!')
			return res.redirect('/')
		}
		
		const hashedPassword = await bcrypt.hash(password, 12)
		const newUser = await User.create({
			email: email,
			nick: nick,
			password: hashedPassword
		})
		
		return res.redirect('/')
	} catch (e) {
		console.error(e)
		return next(e)
	}
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
	passport.authenticate('local', (authError, user, event) => {
		if (authError) {
			console.error(authError)
			return next(authError)
		} if (!user) {
			req.flash('loginError', event.message)
			return res.redirect('/')
		} 
		
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError)
				return next(loginError)
			} else {
				return res.redirect('/turn')
			}
		})
	})(req, res, next)
})

router.get('/logout', isLoggedIn, (req, res) => {
	req.logout()
	req.session.destroy()
	res.redirect('/')
})

module.exports = router