'use strict';

const Projects = require('./model');
const formValidationHandler = require('./../utils/validationHandler')

//===================
// Create Projects Route
//===================
const createProject = async (req, res, next) => {

  // Finds the validation errors in this request and wraps them in an error object
  const errors = await formValidationHandler.createProjectValidation(req);
  //console.log(`errors=> ${JSON.stringify(errors)}`)

  // return;
   if (errors !== false) {
     res.status(422).json({ errors: errors});//Sending validation error response
     return;
  }

  const {projectNo, projectName, startDate, fiinishDate, projectManager, projectCo, manHrs, customerID, projectManHrs, projectCoHrs, checker,modeler, detailer,scopeOfWork,risks,notes,uid} = req.body 


  let project = new Projects({projectNo,projectName,startDate, fiinishDate, projectManager, projectCo, manHrs, customerID, projectManHrs, projectCoHrs, checker,modeler, detailer,scopeOfWork,risks,notes,uid});

  project.save(function(err, projectName) {
    if(err) {return next(projectName);}
    
    console.log(projectName)

   
    res.status(201).json({ message: "Thanks! Your request was submitted successfuly!" });
    next();
  })
}
const getProjects = async(req,res) => {
  Projects.find((err, projects) => {
    if(err) res.send(err);
    res.status(200).json(projects)
  })
}
// const getProjects = async(req,res) => {
//     const {uid} = req.body;
//     try
//     {        
//     // Finds the validation errors in this request and wraps them in an error object
//     const errors = await formValidationHandler.getProjectValidation(req);
//     //console.log(`errors=> ${JSON.stringify(errors)}`)
  
//     // return;
//      if (errors !== false) {
//        res.status(422).json({ errors: errors});//Sending validation error response
//        return;
//     }
//     let projects;
    
//         projects = await Projects.find();
    
//     if(projects){
//       res.status(200).json(projects); 
//     }
  
//   }catch(err)
//   {
//     console.log(`err : ${err}`)
//     res.status(500).json({err: err})
//   }
  
//   }
module.exports = {
    createProject,
    getProjects
}