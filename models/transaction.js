const env = 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config)


module.exports = {

    findById,
    allUser, 
};

async function findById(id){
    return knex("accounts")
    .select('userid','total_amount','deposited_amount','withdraw_amount')
    .where({userid : id})
  
}

async function allUser(){
    return knex.select('id','username','total_amount').from("user")

    
}