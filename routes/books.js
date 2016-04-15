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

router.get('/books', (req, res, next) => {
  const books = knex('books');
  const authors = knex('authors').join('author_books', 'authors.id', 'author_books.author_id');
  Promise.all([books, authors]).then(function(data) {
    for (var i = 0; i < data[0].length; i++) {
      data[0][i].authorArray = [];
      for (var j = 0; j < data[1].length; j++) {
        if(data[1][j].book_id === data[0][i].id) {
          data[0][i].authorArray.push(data[1][j].first + ' ' + data[1][j].last);
        }
      }
    }
    res.render('books/index', {allBooks: data[0]});
  });
});

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
  books().where({'books.id': req.params.id})
  .join('author_books', 'books.id', 'author_books.book_id')
  .join('authors', 'author_books.author_id', 'authors.id')
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
