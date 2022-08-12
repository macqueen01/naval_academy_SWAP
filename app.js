const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const mainRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const turnRouter = require('./routes/turn')
const feedRouter = require('./routes/feed')

const expirationCheck = require('./utilities/backgroundSystem.js')


const passport = require('passport')
const sequelize = require('./models').sequelize
const passportConfig = require('./passport')

const app = express()
sequelize.sync()



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cookieParser('jaekim'))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(session({
	resave:false,
	saveUninitialized:false,
	secret:'jaekim',
	cookie:{
		httpOnly: true,
		secure: false
	}
}))
app.use(flash())
passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', mainRouter)
app.use('/auth', authRouter)
app.use('/turn', turnRouter)
app.use('/feed', feedRouter)

setInterval(expirationCheck, 3600000)

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err)
})

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') == 'development' ? err : {};
	res.status(err.status || 500)
	res.render('error')
})

app.listen(app.get('port'), () => {console.log(`listening on port ${app.get('port')}`)});




