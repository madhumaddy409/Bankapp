var express = require("express")
var router = express.Router()
const {auth} = require("../middleware/auth")
const User = require("../models/user")
const redis = require('redis')



const { postSignup ,postLogin ,getUser ,getUsers ,cache } = require("../controllers/user")


//register
router.post("/register",postSignup);

//getuser details
router.get("/user/:id",getUser);

//login
router.post("/login", postLogin)


router.get("/profile", auth , async (req, res) => {
    await User.userProfile(req.user.id)
     .then(User => {
         if(User){
            res.status(200).json(User)
        }
        else{
            res.status(404).json({message:"unable to find Id"})
        }
         
     })
     .catch(error =>{
         res.status(500).json({message:"unable to perform operation"})
 
     })
  });  

  
  router.get("/users", getUsers)


module.exports = router;