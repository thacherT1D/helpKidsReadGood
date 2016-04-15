var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function authors() {
  return knex('authors');
}

// router.get('/authors', function(req, res, next) {
//   authors().select()
//   .then(function (records) {
//     res.render('authors/index', {allAuthors: records});
//   });
// });

router.get('/authors', (req, res, next) => {
  const authors = knex('authors');
  const books = knex('books').join('author_books', 'books.id', 'author_books.book_id');
  Promise.all([authors, books]).then(function(data) {
    console.log(data);
    for (var i = 0; i < data[0].length; i++) {
      data[0][i].bookArray = [];
      for (var j = 0; j < data[1].length; j++) {
        if(data[1][j].author_id === data[0][i].id) {
          data[0][i].bookArray.push(data[1][j].title);
        }
      }
    }
    res.render('authors/index', {allAuthors: data[0]});
  });
});

router.get('/authors/new', function(req, res, next) {
  res.render('authors/new');
});

router.post('/authors', function(req, res, next) {
  authors().insert({
    first: req.body.author_first,
    last: req.body.author_last,
    bio: req.body.author_bio,
    url: req.body.author_url
  }).then(function () {
    res.redirect('/authors');
  });
});

router.get('/authors/:id', function(req, res, next) {
  authors().where({id: req.params.id})
  .first()
  .then(function (record) {
    res.render('authors/show', {theAuthor: record});
  });
});

router.get('/authors/:id/update', function(req, res, next) {
  authors().where({id: req.params.id}).first().then(function (record) {
    res.render('authors/update', {theAuthor: record});
  });
});

router.delete('/authors/:id', function(req, res, next) {
  authors().del().where({id: req.params.id}).then(function () {
    res.redirect('/authors');
  });
});

router.put('/authors/:id/update', function(req, res, next) {
  authors().select()
  .where({id: req.params.id})
  .first()
  .update({
    first: req.body.author_first,
    last: req.body.author_last,
    bio: req.body.author_bio,
    url: req.body.author_url
  }).then(function () {
    res.redirect('/authors');
  });
});

module.exports = router;
