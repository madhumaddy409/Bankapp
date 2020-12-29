var express = require("express")
var router = express.Router()

const { postTrans, postTransUser } = require('../controllers/transaction')

router.get("/transaction/:userid",postTrans);
router.get("/transactions/users",postTransUser);


module.exports = router;
