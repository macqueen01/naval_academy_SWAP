const localStrategy = require('passport-local').Strategy
const User = require('../models').User
const bcrypt = require('bcrypt')


module.exports = (passport) => {
	passport.use(new localStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, async (email, password, done) => {
		try {
			const user = await User.findOne({
				where: {email : email}
			})
			
			if (user) {
				const result = await bcrypt.compare(password, user.password)
				if (result) {
					done(null, user)
				} else {
					done(null, false, {message: "Wrong Password!"})
				}
			} else {
				done(null, false, {message: "No User Found..."})
			}
		} catch (e) {
			console.error(e)
			done(e)
		}
	}))
	
}