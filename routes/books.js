var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function books() {
  return knex('books');
}

// router.get('/books', function(req, res, next) {
//   books()
//   .join('author_books', 'books.id', 'author_books.book_id')
//   .join('authors', 'author_books.author_id', 'authors.id')
//   .select()
//   .then(function (records) {
//     res.render('books/index', {allBooks: records});
//   });
// });

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books', function(req, res, next) {
  books().insert({
    title: req.body.book_title,
    genre: req.body.book_genre,
    description: req.body.book_description,
    url: req.body.book_url
  }).then(function () {
    res.redirect('/books');
  });
});

router.get('/books/:id', function(req, res, next) {
  books().join('author_books', 'books.id', 'author_books.book_id')
  .join('authors', 'author_books.author_id', 'authors.id')
  .where({'books.id': req.params.id})
  .first()
  .then(function (record) {
    res.render('books/show', {theBook: record});
  });
});

router.get('/books/:id/update', function(req, res, next) {
  books().where({'books.id': req.params.id})
  .join('author_books', 'books.id', 'author_books.book_id')
  .join('authors', 'author_books.author_id', 'authors.id')
  .first()
  .then(function (record) {
    console.log(record);
    res.render('books/update', {theBook: record});
  });
});

router.delete('/books/:id', function(req, res, next) {
  books().del().where({id: req.params.id}).then(function () {
    res.redirect('/books');
  });
});

router.put('/books/:id/update', function(req, res, next) {
  console.log(req.body);
  console.log(req.params);
  books()
  .where({id: parseInt(req.params.id)})
  .update({
    title: req.body.book_title,
    genre: req.body.book_genre,
    description: req.body.book_description,
    url: req.body.book_url
  }).then(function () {
    res.redirect('/books');
  });
});

module.exports = router;
