const express = require('express');
const router = express.Router();


// Require controller modules.
const _userAuthController =  require('./../user/controller');

router.post('/signup', _userAuthController.signup);
router.post('/signin', _userAuthController.signin);
router.post('/signout', _userAuthController.signout);
router.get('/list', _userAuthController.usersList);

module.exports = router;