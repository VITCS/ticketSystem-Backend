//'use strict';
const Joi = require('@hapi/joi');
const moment = require('moment');
const {buildJoiError} = require('./buildError');
const {decrypt} = require('./helper')

class formValidationHandler {

    /**
     * Signup form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
    async signupValidation(req){
        console.log('data',req.body)
        const signupSchema = Joi.object().keys({
            EmployeeID: Joi.string().min(3).max(10).required().error(() => {return {message: "Employee ID missed"}}),
            EmployeeName: Joi.string().min(3).max(50).required().error(() => {return {message: "Employee Name missed"}}),
            Email: Joi.string().email({ minDomainSegments: 2 }).required().error(() => {return {message: "Enter Valid email"}}),
            Pwd: Joi.string().required().error(() => {return {message: "Password missed"}}),
            UserType: Joi.any().valid('superAdmin','admin','standard').required().error(() => {return {message: "Role Missed"}}),
            DOBirth: Joi.date().required().error(() => {return {message: "DOBirth missed"}}),
            DOJoining: Joi.date().required().error(() => {return {message: "DOBirth missed"}}),
            Cost: Joi.number().required().error(() => {return {message: "Cost missed"}}),
            Qualification: Joi.string().required().error(() => {return {message: "Qualification missed"}}),
            PrevExp: Joi.string().required().error(() => {return {message: "PrevExp missed"}}),
            Certifications: Joi.string().required().error(() => {return {message: "Certifications missed"}}),
            SkillSet: Joi.string().required().error(() => {return {message: "SkillSet missed"}}),
            Strengths: Joi.string().required().error(() => {return {message: "Strengths missed"}}),
            Improvements: Joi.string().required().error(() => {return {message: "Improvements missed"}}),
            UpSkill: Joi.string().required().error(() => {return {message: " UpSkill missed"}}),
            ContactNum: Joi.number().required().error(() => {return {message: "ContactNum missed"}}),

        });
        
        console.log(req.body.Pwd,'password')

        req.body.Pwd = decrypt(req.body.Pwd ? req.body.Pwd : '');
       
        const error = Joi.validate(req.body, signupSchema,{abortEarly:false});
        if(error.error !== null)
            return await buildJoiError(error);    
        else
            return false;  
    }

    /**
     * Login form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
    async loginValidation(req){
        
        const loginSchema = Joi.object().keys({
            Pwd: Joi.string().required().error(() => {return {message: "Password Required"}}),
            Email: Joi.string().email({ minDomainSegments: 2 }).required().error(() => {return {message: "Email Required"}})
        });

        req.body.Pwd = decrypt(req.body.Pwd ? req.body.Pwd : '');
        console.log(req.body.Pwd,'password')
    
        const error = Joi.validate(req.body, loginSchema,{abortEarly:false});
        if(error.error !== null)
            return await buildJoiError(error);    
        else
            return false;  
    }

    /**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
    async createTicketValidation(req){
        const schema = {
            type: Joi.string().required().error(() => {return {message: "Absence Type required"}}),
            fromDate: Joi.date().required().error(() => {return {message: "From Date required"}}),
            toDate: Joi.date().required().error(() => {return {message: "To Date required"}}),
            reasonLeave: Joi.string().required().error(() => {return {message: "Reason Leave required"}}),
            empID: Joi.string().required().error(() => {return {message: "Emp ID required"}}),
            empName: Joi.string().required().error(() => {return {message: "Emp Name required"}}),
            uid: Joi.string().required().error(() => {return {message: "UID required"}}),
            status: Joi.string().required().error(() => {return {message: "status required"}}),
        }
       
        const error = Joi.validate(req.body, schema,{abortEarly:false});
        if(error.error !== null)
            return await buildJoiError(error);    
        else
            return false;
    }
/**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
    async createProjectValidation(req){
        const schema = {
        projectNo: Joi.number().required().error(() => {return {message: "Project No required"}}),
        projectName: Joi.string().required().error(() => {return {message: "Project Name required"}}),
        startDate: Joi.date().required().error(() => {return {message: "Start Date required"}}),
        fiinishDate: Joi.date().required().error(() => {return {message: "fiinishDate Date required"}}),
        projectManager: Joi.string().required().error(() => {return {message: "Project Manager required"}}),
        projectCo: Joi.string().required().error(() => {return {message: "Project Co-Ordinator required"}}),
        manHrs: Joi.number().required().error(() => {return {message: "Man Hours required"}}),
        customerID: Joi.number().required().error(() => {return {message: "CustomerID required"}}),
        projectManHrs: Joi.number().required().error(() => {return {message: "Project Manager Hours required"}}),
        projectCoHrs: Joi.number().required().error(() => {return {message: "Project Co-Ordinator Hours required"}}),
        checker: Joi.number().required().error(() => {return {message: "checker hours required"}}),
        modeler: Joi.number().required().error(() => {return {message: "modeler hours required"}}),
        detailer: Joi.number().required().error(() => {return {message: "detailer hours required"}}),
        scopeOfWork: Joi.string().required().error(() => {return {message: "Project Name required"}}),
        risks: Joi.string().required().error(() => {return {message: "Project Name required"}}),
        notes: Joi.string().required().error(() => {return {message: "Project Name required"}}),
	    uid: Joi.string().required().error(() => {return {message: "UID required"}}),
        }
       
        const error = Joi.validate(req.body, schema,{abortEarly:false});
        if(error.error !== null)
            return await buildJoiError(error);    
        else
            return false;
    }

    /**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async saveTimeSheetValidation(req){
    console.log('data saveTimeSheetValidation',req.body)
    const schema = {
        empId: Joi.string().required().error(() => {return {message: "Emp ID required"}}),
        empName: Joi.string().required().error(() => {return {message: "Emp Name required"}}),
        loggedDate: Joi.string().required().error(() => {return {message: "Logged Date required"}}),
        projectName: Joi.string().required().error(() => {return {message: "Project Name required"}}),
        projectID: Joi.number().required().error(() => {return {message: "Project ID required"}}),
        activity: Joi.string().required().error(() => {return {message: "Activity required"}}),
        timeIN: Joi.string().required().error(() => {return {message: "Time-IN required"}}),
        timeOUT: Joi.string().required().error(() => {return {message: "Time-OUT required"}}),
        hours: Joi.string().required().error(() => {return {message: "Hours required"}}),
        totalHours: Joi.string().required().error(() => {return {message: "Total Hours required"}}),
        status: Joi.string().required().error(() => {return {message: "Status required"}}),
        reference: Joi.string().required().error(() => {return {message: "Reference required"}}),
        notes: Joi.string().required().error(() => {return {message: "Notes required"}}),
        flag: Joi.number().required().error(() => {return {message: "flag required"}}),
        uid: Joi.string().required().error(() => {return {message: "UID required"}}),
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}

/**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async submitTimeSheetValidation(req){
    console.log('data submitTimeSheetValidation',req.body)
    const schema = {
        empId: Joi.string().required().error(() => {return {message: "Emp ID required"}}),
        empName: Joi.string().required().error(() => {return {message: "Emp Name required"}}),
        loggedDate: Joi.date().required().error(() => {return {message: "Logged Date required"}}),
        projectName: Joi.string().required().error(() => {return {message: "Project Name required"}}),
        projectID: Joi.number().required().error(() => {return {message: "Project ID required"}}),
        activity: Joi.string().required().error(() => {return {message: "Activity required"}}),
        timeIN: Joi.string().required().error(() => {return {message: "Time-IN required"}}),
        timeOUT: Joi.string().required().error(() => {return {message: "Time-OUT required"}}),
        hours: Joi.string().required().error(() => {return {message: "Hours required"}}),
        totalHours: Joi.string().required().error(() => {return {message: "Total Hours required"}}),
        status: Joi.string().required().error(() => {return {message: "Status required"}}),
        reference: Joi.string().required().error(() => {return {message: "Reference required"}}),
        notes: Joi.string().required().error(() => {return {message: "Notes required"}}),
        flag: Joi.number().required().error(() => {return {message: "flag required"}}),
        uid: Joi.string().required().error(() => {return {message: "UID required"}}),
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}

    /**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async updateTicketValidation(req){
    const schema = {
    id: Joi.string().required().error(() => {return {message: "Ticket Id required"}}),
    uid: Joi.string().error(() => {return {message: "UID Missed"}}),
    status: Joi.string().error(() => {return {message: "Status required"}}),
    comments: Joi.array().error(() => {return {message: "Comments Array required"}})
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}

 /**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async ticketDetailvalidation(req){
    const schema = {
        id: Joi.string().required().error(() => {return {message: "Ticket Id required"}})
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}

/**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async timeSheetDetailvalidation(req){
    const schema = {
        uid: Joi.string().required().error(() => {return {message: "Emp Id required"}})
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}


    /**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async getTicketValidation(req){
    const schema = {
    uid: Joi.string().required().error(() => {return {message: "Ticket Id required"}}),
    userType: Joi.string().error(() => {return {message: "Status required"}}),
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}

/**
     * Forgot password form validation.
     *
     * @param   {Request} req
     * @returns {Object}
    */
   async getProjectValidation(req){
    const schema = {
    uid: Joi.string().required().error(() => {return {message: "Project Id required"}}),
    }
   
    const error = Joi.validate(req.body, schema,{abortEarly:false});
    if(error.error !== null)
        return await buildJoiError(error);    
    else
        return false;
}
    /**
     * Email ID validation.
     *
     * @param   {String} Email
     * @returns {Object}
    */
    async isValidEmail(Email){
        const schema = {
            Email: Joi.string().email({ minDomainSegments: 2 }).required().error(() => {return {message: "61031"}})
        };

        const error = Joi.validate({Email}, schema);
        console.log('email error ', error);
        if(error.error !== null)
            return false;    
        else
            return true;
    }

}


module.exports = new formValidationHandler();