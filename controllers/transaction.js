const Transaction = require("../models/transaction");

exports.postTrans = async (req, res) =>  {
    const {userid} = req.params
    console.log(userid)

    await Transaction.findById(userid)
    .then(trans => {
        if(trans){
            res.status(200).json(trans)
        }
        else{
            res.status(204).json("there is no transaction at all")
        }

    })



}

//user to display
exports.postTransUser = async (req, res) =>  {
   

    await Transaction.allUser()
    .then(Users =>{
        if(Users)
        {
            console.log(Users)
            res.status(200).json(Users)
        }
        else{
            res.status(204).json("there is no users")
        }
    })
}

// exports.postSignup = async (req, res) =>  {

// }
// 9019555572