const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const router = express.Router();


router.get('/', isNotLoggedIn, (req, res, next) => {
	res.render('login', {loginError: req.flash('loginError')})
	//res.render('myturn', {loginError: req.flash('loginError')})
})



router.get('/babies', isNotLoggedIn, (req, res, next) => {
	res.render('join', {joinError: req.flash('joinError')})
})

router.get('/', isLoggedIn, (req, res, next) => {
	res.redirect('/turn')
})



module.exports = router