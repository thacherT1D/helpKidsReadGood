exports.up = function(knex, Promise) {
  return knex.schema.table('books', function (table) {
    table.text('description', 'mediumtext');
    table.text('url', 'mediumtext');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
