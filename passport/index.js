const local = require('./localStrategy')
const User = require('../models').User

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	
	passport.deserializeUser((id, done) => {
		User.findOne({
			where: {id : id}
		}).then((user) => {
			done(null, user)
		}).catch((e) => {
			console.error(e)
			done(e)
		})
	})
	
	local(passport)
}