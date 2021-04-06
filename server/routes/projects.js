const express = require('express');
const router = express.Router();


// Require controller modules.
const _projectController =  require('./../project/controller');

router.post('/create', _projectController.createProject);
router.post('/all', _projectController.getProjects);

module.exports = router;