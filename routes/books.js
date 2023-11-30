const Book = require('../models').Book

var express = require('express');
var router = express.Router();


// handler function to wrap each route 
// replaces try/catch blocks for 
// better code readability 

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}


// Get Books 

router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    console.log(books);
    res.render('index', {
        books: books,
        title: 'Books'
    });

}))


// create book form
router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-book', {
        book: {}
    });
}))

//sequilize validation error

router.post('/new', asyncHandler(async (req, res, next) => {
    const book = await Book.create(req.body)
    res.redirect('/books')
}))

// GET individual book
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render('update-book', {book: book, title: book.title})

}))


module.exports = router;