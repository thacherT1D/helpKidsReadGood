var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function authors() {
  return knex('authors');
}

router.get('/authors', function(req, res, next) {
  authors().select().then(function (records) {
    res.render('authors/index', {allAuthors: records});
  });
});

router.get('/authors/new', function(req, res, next) {
  res.render('authors/new');
});

router.post('/authors', function(req, res, next) {
  authors().insert({
    title: req.body.book_title,
    author: req.body.book_author,
    genre: req.body.book_genre
  }).then(function () {
    res.redirect('/authors');
  });
});

router.get('/authors/:id', function(req, res, next) {
  authors().where({id: req.params.id}).first().then(function (record) {
    res.render('authors/show', {theBook: record});
  });
});

router.get('/authors/:id/update', function(req, res, next) {
  authors().where({id: req.params.id}).first().then(function (record) {
    res.render('authors/update', {theBook: record});
  });
});

router.delete('/authors/:id', function(req, res, next) {
  authors().del().where({id: req.params.id}).then(function () {
    res.redirect('/authors');
  });
});

router.put('/authors/:id/update', function(req, res, next) {
  authors().select().where({id: req.params.id}).first().update({
    title: req.body.book_title,
    author: req.body.book_author,
    genre: req.body.book_genre
  }).then(function () {
    res.redirect('/authors');
  });
});

module.exports = router;
