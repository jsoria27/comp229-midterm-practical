/*
Modified by: Joshua Soriano, id: #301154852
Web App name: Favourite Book List
For COMP229 - Web Application Development Midterm Practical
October 24, 2021
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details', { title: 'Add Book', books: book });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.create(newBook, (err, Book) => {
      if(err)
      {
        console.log(err)
        res.end(err);
      }
      else
      {
        res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.findById(id, (err, bookToEdit) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        res.render('books/details', {title: 'Edit Book Details', books: book})
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    let updatedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
        console.log(err)
        res.end(err)
      }
      else
      {
        console.log(updatedBook)
        res.redirect("/books")
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if (err)
      {
        console.log(err)
        res.end(err)
      }
      else
      {
        res.redirect('/books')
      }
    });
});


module.exports = router;
