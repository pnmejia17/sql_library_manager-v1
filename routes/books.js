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

// catch 404 and forward to error handler

app.use((req, res, next) => {
    const error = new Error('404 Error')
    error.status = 404;
    error.message = 'The page you are looking for does not exist. Sorry!'
    res.status(404).render('page-not-found', { error: error });

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
  

module.exports = router;