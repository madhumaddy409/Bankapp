var express = require("express")
var router = express.Router()
const {auth} = require("../middleware/auth")


const { postDeposit , postWithdraw } = require("../controllers/account")


//deposite
router.post("/deposit",auth,postDeposit);

//withdraw

router.post("/withdraw",auth,postWithdraw);


module.exports = router;