
exports.up = function(knex) {
    
    return knex.schema.createTableIfNotExists('usertest', function(table) {
        table.increments();
        table.string('username');
        table.string('password');
        table.string('account_type');
        table.integer('total_amount');
        table.dateTime('joing_date').defaultTo(knex.fn.now());
        table.dateTime('last_date').defaultTo(knex.fn.now());
        table.timestamps();
    })

        
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('usertest')
};
