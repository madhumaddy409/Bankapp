const { query } = require("express");
const account = require("../models/account")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");
const { withdraw } = require("../models/account");


// deposite operations
exports.postDeposit = async (req, res) =>  {
    const {userid, deposited_amount} = req.body
    console.log(userid)

    //fetch user details and adding deposit amount
    await account.findById(userid)
    .then(user =>{
        const userdet = user
        total_amount = userdet.total_amount
       

        deposited = parseInt(deposited_amount)
        total = total_amount + deposited
        console.log(typeof(total))
    })
    const totall =total_amount

    // const {deposited_amount} =req.body
    console.log(userid, totall , deposited_amount)

    //adding deposite details to account table
    await account.add(totall, userid, deposited_amount)
    
    //updated amount in user table
    await account.updateTotal(userid ,total)
    .then(user_details =>{
        return res.status(200).json({ message: 'deposited'})
        console.log(user_details)

    })
    .catch(error =>{
         res.status(403).json({ error: { message: 'cant added' } })

    })

}


//withdraw amount process
 
exports.postWithdraw  = async (req, res) =>  {

    const {userid , withdraw_amount} = req.body
    console.log(userid)

    //fetch user details and adding deposit amount
    await account.findById(userid)
    .then(user =>{
        const userdet = user
        total_amount = userdet.total_amount
        console.log(total_amount)
       
        
        const withdraw = parseInt(withdraw_amount)
        total = total_amount - withdraw
        console.log(total)
        // res.status(200).json(total)
    })
 
    if(total < 0){
        return res.status(403).json({ error: { message: 'insuffcient fund' } })

    }
    else{
          
            // adding withdraw details to account table
            await account.withdraw(total_amount, userid, withdraw_amount)
            
            // //updated amount in user table
            await account.updateTotal(userid ,total)
            .then(data =>{
                res.status(200).json(total)
            })
            .catch(error =>{
                res.status(500).json({ error: { message: 'incorrect data' } })

            })
            }

  

}
