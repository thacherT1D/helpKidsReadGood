var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function Books() {
  return knex('books');
}

router.get('/books', function(req, res, next) {
  res.render('books/index');
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books', function(req, res, next) {
  Books().insert({ name: req.body.book_name }).then(function () {
    res.redirect('/books');
  });
});

module.exports = router;
