const { query } = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const user = require("../models/user");
const redis = require('redis')
const {promisify} = require('util')


//bank application

exports.postSignup = async (req, res) =>  {

    // const { username,password,account_type } =req.body


    // const salt = await bcrypt.genSalt(10);
    // User.password = await bcrypt.hash(password, salt);
    // console.log(User.password)

   await User.add(req.body)
    .then(User => {
        // res.status(200).json(User)
        if(User){
          res.status(200).json(User)
      }
      else{
          res.status(204).json({message:"unable to signup"})
      }
    })
    .catch(error =>{
        res.status(500).json({message:"unable to perform operation"})

    })

}

exports.getUser = async (req, res) =>  {
    const {id} = req.params
    await User.findById(id)
     .then(User => {
         if(User){
            res.status(200).json(User)
        }
        else{
            res.status(204).json({message:"unable to find Id"})
        }
         
     })
     .catch(error =>{
         res.status(500).json({ error: { message: 'unable to perform operation' } })
 
     })
 
 }

 exports.postLogin = async (req, res) =>  {
    const {username ,password} = req.body
    console.log(username,password)
    await User.login(username,password)
    
    .then(User => {
      console.log(User)
         if(User){
            
            const payload = {
                user: {
                  id: User.id,
                  userName: User.username,
                  userType: User.account_type
                  
                }
              };
        
              jwt.sign(
                payload,
                "randomString",
                {
                  expiresIn: 86400
                },
                (err, token) => {
                  if (err) throw err;
                  res.status(200).json({
                    token
                  });
                }
              );
        }
        else{
          return res.status(403).json({ error: { message: 'invalid email/password' } });
            // res.status(204).json({message:"user and password not matching"})
        }
         
     })
     .catch(error =>{
      return res.status(403).json({ error: { message: 'invalid email/password' } });
 
     })
 
 }



//redis

const Redis_port = Number(process.env.PORT || 6379);

const client = redis.createClient(Redis_port)

const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)

// //cache middlware
//  exports.cache = (req, res, next) => {

//         client.hgetall('userss', (err, users) => {
//           if(err) throw err;

//           if(users){
//             res.send(users)
//             console.log(users)
//           }else{
//             next()
//           }
//       });

// }

 exports.getUsers = async (req, res) =>  {
 try{
      const reply = await GET_ASYNC('allusers')

      if(reply){
        console.log('using cached data')
        res.send(JSON.parse(reply))
        return
      }

      const respone =  await User.allUsers()
      const saveResult = await SET_ASYNC('allusers', JSON.stringify(respone),'EX', 1000)
      
      console.log('new data cached',saveResult)
      // console.log(respone)
      res.send(respone)
 

 } catch(err){
   console.log(err);
   res.status(500)
 }
 
  


}