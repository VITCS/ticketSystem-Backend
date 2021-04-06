'use strict';

const formValidationHandler = require('./../utils/validationHandler')

const UserModel = require('./model');
const TicketModel = require('./../ticket/model');


    /* Returns signup status and User object */
    const signup = async (req, res, next) => {
      try {

        // Finds the validation errors in this request and wraps them in an error object
        const errors = await formValidationHandler.signupValidation(req);
        //console.log(`errors=> ${JSON.stringify(errors)}`)

        // return;
         if (errors !== false) {
           res.status(422).json({ errors: errors});//Sending validation error response
           return;
        }

        //Check user is already existed in Arca
        var existedUser = await UserModel.checkUserExistsByEmail(req.body.Email);
        if(existedUser !== false)
        {
            res.status(409).json({ errors: {code:7101, messge: 'User already exists'}});//Sending validation error response
            return;
        }
        
        //Preparing User Model data
        var userObject = await getPreparedUserObject(req);        

        try
        {         
          // Creating user - Inserting User details in User collection
          var signUpUser = await UserModel.createUser(userObject);
          console.log(`1) Creating user - Inserting User details in User collection`);
          console.log(signUpUser);

          //Formating the response object after successful signup
          var {EmployeeName, Email, UserType} = signUpUser
          const returnUserObj = {
            EmployeeName, 
            Email, 
            UID : signUpUser.id,
            UserType
          }

          console.log(returnUserObj);
          
          const users = await UserModel.find()

          //Returning the Signup response
          res.status(200).json(users);
        } 
        catch(err)
        {
          //Any error we are catching and sending response with the HTTP response code
          console.log(err);
          res.status(500).json({error: err});
        }       
      } 
      catch(err)
      {
        //Any HTTP Error
        console.log('error in catch' + err);
        res.status(500).json({error: err});
      }
      
    }//End of Signup function
  
    /* Returns jwt token and User object if valid username and password is provided */
    const signin = async(req, res, next) => {
      try
      {
        console.log('singin');
        // Finds the validation errors in this request and wraps them in an error object
        const errors = await formValidationHandler.loginValidation(req);
        console.log(`errors=> ${JSON.stringify(errors)}`)

        // return;
         if (errors !== false) {
           res.status(422).json({ errors: errors});//Sending validation error response
           return;
        }
             
        //1) Validating User Login
        var UserResponse = await UserModel.loginUser(req.body);
        //console.log(`UserResponse `, UserResponse)
        if(UserResponse === false)//Invalid Login
        {
            res.status(503).json({ errors: {code:503, message: 'Invalid User name or password'}});//Sending validation error response
            return;
        }
        else
        {
          //Successful Login
          var responseObj = {status: 'success'};
          let tickets;

          if(UserResponse.UserType === "admin"){
            tickets = await TicketModel.find();
            const users = await UserModel.find();
            responseObj.userList =  users;
          }else{
            tickets = await TicketModel.find({uid: UserResponse.UID});
            responseObj.userList =  [];
          }
          
         
          responseObj.user = UserResponse;
          responseObj.tickets = tickets;
         
          
          //console.log(responseObj, 'responseObj')

          res.status(200).json(responseObj);
        }
      }
      catch(err)
      {
        res.status(500).json({err: err})
      }
    }//End of Signin function
  
    /* Returns true on successful logout and clears all the Redis cache for that user */
    const signout = async(req, res, next) => {
      try {
        //Need to delete JWT token

        res.json({ status: "success"});
      } catch(err) {
        res.status(500).json({err: err})
      }
    }//End of Signout function


    /* Preparing User model object from the data of submitted form */
   const getPreparedUserObject = async (req) => {
      
    let userObject = {
      EmployeeID:req.body.EmployeeID,
      EmployeeName: req.body.EmployeeName,
        Email: req.body.Email,
        Pwd : req.body.Pwd,
        UserType: req.body.UserType,
        DOBirth:req.body.DOBirth,
        DOJoining: req.body.DOJoining,
        Cost : req.body.Cost,
        Qualification: req.body.Qualification,
        PrevExp:req.body.PrevExp,
        Certifications: req.body.Certifications,
        SkillSet : req.body.SkillSet,
        Strengths: req.body.Strengths,
        Improvements:req.body.Improvements,
        UpSkill:req.body.UpSkill,
        ContactNum: req.body.ContactNum,
    }

    console.log(`User Object ${JSON.stringify(userObject)}`);
    return userObject;
  }

  const usersList = async(req,res) => {
    UserModel.find((err, users) => {
      if(err) res.send(err);
      res.status(200).json(users)
    })
  }

module.exports = {
  signup,
  signin,
  signout,
  usersList
};