// Importing packages that are required for this
// schema
const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//================================
// Ticketing Schema
//================================
const TicketSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate:{
    type: Date,
    required: true
  },
  reasonLeave:{
    type: String,
    required: true
  },
  empID: {
    type: String,
    required: true
  },
  empName:{
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: String,
    required: true
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

module.exports = mongoose.model('Tickets', TicketSchema);
