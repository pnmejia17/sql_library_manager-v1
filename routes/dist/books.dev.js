"use strict";

var Book = require('../models').Book;

var express = require('express');

var router = express.Router(); // Get Books 

router.get('/', function _callee(req, res, next) {
  var books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Book.findAll());

        case 2:
          books = _context.sent;
          console.log(books);
          res.render('index', {
            books: books,
            title: 'Books'
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/new', function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('new-book', {
            book: {}
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/new', function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Book.create(req.body));

        case 2:
          res.redirect('/books');

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;