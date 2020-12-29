
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('Accounts', function(table) {
        table.increments();
        table.integer('total_amount');

        table.integer('userid').unsigned().nullable();
        table.foreign('userid').references('user.id');

        table.integer('deposited_amount');
        table.integer('withdraw_amount');


        
       
        table.dateTime('transection_date').defaultTo(knex.fn.now());

        table.timestamps(true,true);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Accounts')
};
