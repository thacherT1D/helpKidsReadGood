
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function (table) {
    table.increments();
    table.string('name');
    table.string('genre');
    table.integer('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
