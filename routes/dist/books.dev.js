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
          res.render('index', {
            books: books,
            title: 'Books'
          });

        case 4:
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
})); //create new book

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
})); // GET individual book

router.get("/:id", asyncHandler(function _callee5(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context5.sent;

          if (book) {
            res.render('update-book', {
              book: book,
              title: book.title
            });
          } else {
            res.sendStatus(404);
          }

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
})); // update individual book

router.post("/:id", asyncHandler(function _callee6(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context6.sent;

          if (!book) {
            _context6.next = 9;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(book.update(req.body));

        case 6:
          res.redirect("/books");
          _context6.next = 10;
          break;

        case 9:
          res.sendStatus(404);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
})); // delete individual book

router.post("/:id/delete", asyncHandler(function _callee7(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context7.sent;

          if (!book) {
            _context7.next = 9;
            break;
          }

          _context7.next = 6;
          return regeneratorRuntime.awrap(book.destroy());

        case 6:
          res.redirect("/books");
          _context7.next = 10;
          break;

        case 9:
          res.sendStatus(404);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  });
}));
module.exports = router;