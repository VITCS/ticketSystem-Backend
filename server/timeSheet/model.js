// Importing packages that are required for this
// schema
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//================================
// TimeSheet Schema
//================================
const TimeSheetSchema = new Schema({
    empId: {
    type: String,
    required: true
  },
  empName: {
    type: String,
    required: true
  },
  loggedDate:{
    type: Date,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  projectID: {
    type: Number,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  timeIN: {
    type: String,
    required: true
  },
  timeOUT: {
    type: String,
    required: true
  },
  hours:{
    type: String,
    required: true
  },
  totalHours:{
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  flag: {
    type: Number,
    required: true
  },
  uid: {
    type: String,
    required: true,
    index: true
  },
  CrtdOn: {
    type: Date
},
  ModOn: {
    type: Date
}
}, {
  autoIndex: false,
  timestamps: { createdAt: 'CrtdOn', updatedAt: 'ModOn' },
});

module.exports = mongoose.model('TimeSheet', TimeSheetSchema);
