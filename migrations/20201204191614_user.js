exports.up = function(knex) {

    
    return knex.schema.createTableIfNotExists('user', function(table) {
        table.increments();
        table.string('username');
        table.string('password');
        table.string('account_type');
        table.integer('total_amount');
        table.dateTime('joing_date').defaultTo(knex.fn.now());
        table.timestamps(true,true);
    })
   
        
    

    // npm run knex migrate:latest   

    
  
};



exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user')
  
};
