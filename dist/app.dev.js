"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var booksRouter = require('./routes/books');

var app = express();

var sequelize = require("./models/index").sequelize;

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sequelize.authenticate());

        case 3:
          console.log('Connection to the database successful!');
          sequelize.sync();
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error connecting to the database: ', _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
})(); // view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter); // 404 error page

app.use(function (req, res, next) {
  var error = new Error('404 Error');
  error.status = 404;
  error.message = 'The page you are looking for does not exist. Sorry!';
  res.status(404).render('page-not-found', {
    error: error
  }); // global error handler

  app.use(function (err, req, res, next) {
    err.status = 500;
    err.message = 'Our apolgies. There appears to be a server error';
    console.error("Error: ".concat(err.message, ", Status: ").concat(err.status));
    res.status(err.status).render('error', {
      err: err
    });
  });
});
module.exports = app;