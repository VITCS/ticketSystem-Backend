
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    EmployeeID:{type: String, unique: true, required: true},
    EmployeeName: { type: String },
    UserType: {type: String},
    Email: { type: String, unique: true, required: true},
    Pwd: { type: String, index: true, required: true},
    DOBirth: {type: Date},
    DOJoining:{type: Date},
    LastWDay:{type: Date},
    Cost:{type: Number},
    Qualification: { type: String },
    PrevExp:{ type: String },
    Certifications:{ type: String },
    SkillSet:{ type: String },
    Strengths:{ type: String },
    Improvements:{ type: String },
    UpSkill:{ type: String },
    ContactNum: { type: Number },
    CrtdOn: {type: Date},
    ModOn: {type: Date}
    
}, { autoIndex: true, timestamps: { createdAt: 'CrtdOn', updatedAt: 'ModOn' } });


module.exports = {userSchema};