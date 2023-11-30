"use strict";

var Book = require('../models').Book;

var express = require('express');

var router = express.Router(); // handler function to wrap each route 
// replaces try/catch blocks for 
// better code readability 

function asyncHandler(cb) {
  return function _callee(req, res, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(cb(req, res, next));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            res.status(500).send(_context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  };
} // Get Books 


router.get('/', asyncHandler(function _callee2(req, res) {
  var books;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Book.findAll());

        case 2:
          books = _context2.sent;
          console.log(books);
          res.render('index', {
            books: books,
            title: 'Books'
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
})); // create book form

router.get('/new', asyncHandler(function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('new-book', {
            book: {}
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
})); //sequilize validation error

router.post('/new', asyncHandler(function _callee4(req, res, next) {
  var book;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Book.create(req.body));

        case 2:
          book = _context4.sent;
          res.redirect('/books');

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
})); //pug file for when form is empty

module.exports = router;