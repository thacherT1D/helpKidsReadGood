var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function Books() {
  return knex('books');
}

router.get('/books', function(req, res, next) {
  books().select().then(function() {
    res.render('books/', {allBooks: records});
  });
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books', function(req, res, next) {
  books().insert({
    name: req.body.book_name
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

module.exports = router;
