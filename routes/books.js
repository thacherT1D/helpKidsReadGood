var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function books() {
  return knex('books');
}

router.get('/books', function(req, res, next) {
  books().select().then(function(records) {
    res.render('books/index',
    {allBooks: records});
  });
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books', function(req, res, next) {
  books().insert({
    name: req.body.book_name,
    author: req.body.book_author,
    genre: req.body.book_genre,
    rating: req.body.book_rating
  }).then(function () {
    res.redirect('/books');
  });
});

router.get('/books/:id', function(req, res, next) {
  books().where({ id: req.params.id}).first().then(function (record) {
    console.log(record);
    res.render('books/show', {theBook: record});
  });
});

router.get('/books/:id/update', function(req, res, next) {
  books().where({id: req.params.id}).first().then(function (record) {
    res.render('books/update', {theBook: record});
  });
});

router.delete('/books/:id', function(req, res, next) {
  books().del().where({id: req.params.id}).then(function () {
    res.redirect('/books');
  });
});

router.put('/books/:id/update', function(req, res, next) {
  books().select().where({id: req.params.id}).first().update({
    name: req.body.book_name,
    author: req.body.book_author,
    genre: req.body.book_genre,
    rating: req.body.book_rating
  }).then(function () {
    res.redirect('/books');
  });
});

module.exports = router;
