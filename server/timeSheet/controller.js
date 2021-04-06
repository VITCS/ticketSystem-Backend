'use strict';

const TimeSheet = require('./model');
const formValidationHandler = require('./../utils/validationHandler')

//===================
// Create Timesheet Route
//===================
const saveTimeSheet = async (req, res, next) => {
console.log("inside save timesheet")
  // Finds the validation errors in this request and wraps them in an error object
  const errors = await formValidationHandler.saveTimeSheetValidation(req);
  //console.log(`errors=> ${JSON.stringify(errors)}`)

  // return;
   if (errors !== false) {
     res.status(422).json({ errors: errors});//Sending validation error response
     return;
  }

  const {empId,empName,loggedDate,projectName,projectID,activity,timeIN,timeOUT,hours,totalHours,status,reference,notes,flag,uid} = req.body 


  let timeSheet = new TimeSheet({empId,empName,loggedDate,projectName,projectID,activity,timeIN,timeOUT,hours,totalHours,status,reference,notes,flag,uid});

  timeSheet.save(function(err, empName) {
    if(err) {return next(empName);}
    
    console.log(empName)

   
    res.status(201).json({ message: "Thanks! Your request was saved successfuly!" });
    next();
  })
}

const submitTimeSheet = async (req, res, next) => {
    console.log("inside submit timesheet")
      // Finds the validation errors in this request and wraps them in an error object
      const errors = await formValidationHandler.submitTimeSheetValidation(req);
      //console.log(`errors=> ${JSON.stringify(errors)}`)
    
      // return;
       if (errors !== false) {
         res.status(422).json({ errors: errors});//Sending validation error response
         return;
      }
    
      const {empId,empName,loggedDate,projectName,projectID,activity,timeIN,timeOUT,hours,totalHours,status,reference,notes,flag,uid} = req.body 
    
    
      let timeSheet = new TimeSheet({empId,empName,loggedDate,projectName,projectID,activity,timeIN,timeOUT,hours,totalHours,status,reference,notes,flag,uid});

      //console.log(' timeSheet timeSheet '+timeSheet.empId)

      timeSheet.save(function(err, empName) {
        if(err) {return next(empName);}
        console.log(empName)
        res.status(201).json({ message: "Thanks! Your request was saved successfuly!" });
        next();
      })

    //   const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    //   const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
    //   //let today = new Date();
    //   console.log("today :: "+startOfDay+" endOfDay :: "+endOfDay)
    //  TimeSheet.find({CrtdOn: {$gt: startOfDay, $lt: endOfDay}}, (err, timeSheet1) => {
    //   if(err) res.send(err);
    //   res.status(200).json(timeSheet1)
    // })
    }

   
const getTimeSheetDetailsLoggedHours = async(req, res) => {
    const {uid} = req.body;
    console.log("::: empId::: "+uid)
    try
    {        
    // TimeSheet.find({uid:uid}, (err, timeSheet) => {
    //   if(err) res.send(err);
    //   res.status(200).json(timeSheet)
    // })
    TimeSheet.find({ $and: [ { uid: uid }, { totalHours : {$gte: "09:00" }}] }).exec(function ( err, timeSheetLogHrs ) {
      if(err) res.send(err);
      res.status(200).json(timeSheetLogHrs)
      console.log( timeSheetLogHrs ) 
    })
  
  }catch(err)
  {
    console.log(`err : ${err}`)
    res.status(500).json({err: err})
  }
  }

  const getTimeSheetDetailsById = async(req,res) => {
    console.log( "indi=side getTimeSheetDetailsById endpoint" )
    const {uid} = req.body;
    const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
    console.log("today :: "+startOfDay+" endOfDay :: "+endOfDay)
    try
    {        
    TimeSheet.find({ $and: [ { uid: uid }, { CrtdOn: {$gt: new Date(startOfDay), $lt: new Date(endOfDay)} } ] }).exec(function ( err, timeSheetByID ) {
        if(err) res.send(err);
        res.status(200).json(timeSheetByID)
        console.log( timeSheetByID ) 
      })
  }catch(err)
  {
    console.log(`err : ${err}`)
    res.status(500).json({err: err})
  }
  
  }

  const getTimeSheetDailyReport = async(req, res) => {
    let ObjectId    = require('mongodb').ObjectID;
  try
    {        
    const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
    let today = new Date();
    console.log("today :: "+startOfDay+" endOfDay :: "+endOfDay)
    TimeSheet.aggregate([{$match: {CrtdOn: {$gt: new Date(startOfDay), $lt: new Date(endOfDay)}}},
    { $sort: { 
      empId: 1
    }
    }
    ]).exec(function ( err, timeSheet1 ) {
      if(err) res.send(err);
      res.status(200).json(timeSheet1)
      console.log( timeSheet1 ) 
    })
  
  }catch(err)
  {
    console.log(`err : ${err}`)
    res.status(500).json({err: err})
  }
 }

module.exports = {
    saveTimeSheet,
    submitTimeSheet,
    getTimeSheetDetailsLoggedHours,
    getTimeSheetDailyReport,
    getTimeSheetDetailsById
}