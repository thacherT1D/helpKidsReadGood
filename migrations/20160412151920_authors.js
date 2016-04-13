
exports.up = function(knex, Promise) {
  return knex.schema.table('authors', function(table) {
    table.text('bio');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('authors', function(table) {
    table.dropColumn('bio');
  });
};
