exports.up = function(knex, Promise) {
  return knex.schema.table('books', function (table) {
    table.dropColumn('description');
    table.dropColumn('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
