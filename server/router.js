//server router.js

//import dependencies
const express = require('express');

// import controllers
const _ticketController = require('./ticket/controller');
const _userAuthController = require('./user/controller');
const _projectController = require('./project/controller');
const _timeSheetController = require('./timeSheet/controller');

module.exports = function(app) {

  const ticketRoutes = express.Router();
  const userRoutes = express.Router();
  const projectRoutes = express.Router();
  const timeSheetRoutes = express.Router();

//==================
// TICKET ROUTES
//==================
  apiRoutes.use('/tickets', ticketRoutes);

  ticketRoutes.post('/create-new-ticket', requireAuth, _ticketController.createTicket);

//==================
// User ROUTES
//==================
  apiRoutes.use('/user', ticketRoutes);
  apiRoutes.use('/projects', projectRoutes);
  apiRoutes.use('/timeSheet', timeSheetRoutes);

  userRoutes.post('/signup', _userAuthController.signup);
  userRoutes.post('/signin', _userAuthController.signin);
  userRoutes.post('/signout', _userAuthController.signout);

  app.use('/api', apiRoutes);

  projectRoutes.post('/create-new-project',_projectController.createProject);
  timeSheetRoutes.post('/save-timeSheet',_timeSheetController.saveTimeSheet);
  timeSheetRoutes.post('/save-timeSheet',_timeSheetController.submitTimeSheet);
}
