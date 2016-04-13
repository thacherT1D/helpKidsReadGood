
exports.up = function(knex, Promise) {
  return knex.schema.table('authors', function(table) {
    table.text('url', 'mediumtext');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('authors', function(table) {
    table.dropColumn('bio');
  });
};
