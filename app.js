var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var usersRouter = require('./routes/users');

var app = express();

var sequelize = require("./models/index").sequelize;

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database successful!');
      sequelize.sync();
    } catch (error) {
      console.error('Error connecting to the database: ', error);
    }
  })();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('404 Error')
  error.status = 404;
  error.message = 'The page you are looking for does not exist. Sorry!'
  res.status(404).render('page-not-found', { error: error });

});

// global error handler
app.use((err, req, res, next) => {
  err.status = 500
  err.message = 'Our apolgies. There appears to be a server Error'
  console.error(`Error: ${err.message}, Status: ${err.status}`)
  res.status(err.status).render('error', { err: err })
  })

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;




