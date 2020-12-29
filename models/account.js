const env = 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config)

const sql = knex('account').toString();

module.exports = {

    add,// adding deposited amount query
    findById,
    updateDeposite,
    updateTotal,

    withdraw

   
};

async function findById(id){
    return knex("user")
    .where({id : id})
    .first()
}

async function updateDeposite(userid){
    return knex("accounts")
    .update({deposited_amount: 10})
    .where({userid : userid})
    
}



async function add(total_amount,userid,deposited_amount){
    const deposite = await knex("accounts").insert({total_amount:total_amount,userid:userid,deposited_amount:deposited_amount});

    // return deposite
}

async function updateTotal(userid, totalAmount){
    return knex("user")
    .update({total_amount: totalAmount})
    .where({id : userid})
    
}

async function withdraw(total_amount,userid,withdraw_amount){
    const withdraw = await knex("accounts").insert({total_amount:total_amount,userid:userid,withdraw_amount:withdraw_amount});

    // return deposite
}