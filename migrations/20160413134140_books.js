exports.up = function(knex, Promise) {
  return knex.schema.table('books', function (table) {
    table.renameColumn('name', 'title');
    table.dropColumn('rating');
    table.string('description');
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
