var express = require('express')
var router = express.Router()

//router.use('/', function(req, res){res.status(200).json({"msg":"Server started"})});
router.use('/ticket', require('./tickets'));
router.use('/user', require('./user'));
router.use('/projects', require('./projects'));
router.use('/timeSheet', require('./timeSheet'));

module.exports = router