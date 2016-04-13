
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function (table) {
    table.increments();
    table.string('first');
    table.string('last');
    table.string('url');
  });
};

exports.down = function(knex, Promise) {

};
