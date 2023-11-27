const Book = require('../models').Book

var express = require('express');
var router = express.Router();


// Get Books 

router.get('/books', async function (req, res, next) {
    const books = await Book.findAll();
    console.log(books);
    res.render('index', {
        books: books,
        title: 'Books'
    });

})

router.get('/books/new', async function (req, res, next) {
    res.render('new-book', {
        book: {}
    });
})

router.post('books/new', async function (req, res, next) {
    await Book.create(req.body)
    res.redirect('/books')
})

module.exports = router;