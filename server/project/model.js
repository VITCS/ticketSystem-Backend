// Importing packages that are required for this
// schema
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//================================
// Project Schema
//================================
const ProjectSchema = new Schema({
    projectNo: {
    type: Number,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  startDate:{
    type: Date,
    required: true
  },
  fiinishDate:{
    type: Date,
    required: true
  },
  projectManager: {
    type: String,
    required: true
  },
  projectCo: {
    type: String,
    required: true
  },
  manHrs: {
    type: Number,
    required: true
  },
  customerID: {
    type: Number,
    required: true
  },
  projectManHrs: {
    type: Number,
    required: true
  },
  projectCoHrs: {
    type: Number,
    required: true
  },
  checker: {
    type: Number,
    required: true
  },
  modeler: {
    type: Number,
    required: true
  },
  detailer: {
    type: Number,
    required: true
  },
  scopeOfWork: {
    type: String,
    required: true
  },
  risks: {
    type: String,
    required: true
  },
  notes: {
    type: String,
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

module.exports = mongoose.model('Projects', ProjectSchema);
