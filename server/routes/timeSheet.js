const express = require('express');
const router = express.Router();


// Require controller modules.
const _timeSheetController =  require('./../timeSheet/controller');

router.post('/save', _timeSheetController.saveTimeSheet);
router.post('/loggedHours', _timeSheetController.getTimeSheetDetailsLoggedHours);
router.post('/submit', _timeSheetController.submitTimeSheet);
router.post('/dailyReport', _timeSheetController.getTimeSheetDailyReport);
router.post('/byID',_timeSheetController.getTimeSheetDetailsById)

module.exports = router;