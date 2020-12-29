
const env = 'development';
const config = require('../knexfile')[env];
const knex = require('knex')(config)

const sql = knex('user').toString();

module.exports = {

    add,
    findById,
    login,
    userProfile,
    allUsers,
    userFind
};

async function userFind(userName){
    return  knex("user").where({username:userName}).first()

}

async function add(user){
    const [userId] = await knex("user").insert(user);

    return {userId}
}

async function findById(id){
    return knex("user")
    .where({id : id})
    .first()
}

async function login(username,password){
    return knex("user")
    .where({username:username})
    .andWhere({password:password})
    .first()
  
 }

 async function userProfile(id){
    return knex("user")
    .where({id : id})
    .first()
}


async function allUsers(){
    return knex("user")
    .select(`*`)
    .first()
}
