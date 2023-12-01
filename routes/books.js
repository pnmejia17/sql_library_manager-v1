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


//create new book
router.post('/new', asyncHandler(async (req, res, next) => {
    let book;
    try {
        const book = await Book.create(req.body)
        res.redirect('/books')
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            res.render("new-book", {
                book: book,
                errors: error.errors
            })
        } else {
            throw error
        }
    }
}))

// GET individual book
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render('update-book', {
            book: book,
            title: book.title
        })
    } else {
        res.sendStatus(404)
    }
}))

// update individual book
router.post("/:id", asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body);
            res.redirect("/books")
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            book = await Book.build(req.body);
            book.id = req.params.id; // make sure correct article gets updated
            res.render("update-book", {
                book,
                errors: error.errors,
            })
        } else {
            throw error;
        }
    }
}))

// delete individual book
router.post("/:id/delete", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.redirect("/books")
    } else {
        res.sendStatus(404)
    }
}))

router.get('*', asyncHandler(async (req, res) => {
    res.sendStatus(404)
}))
module.exports = router;