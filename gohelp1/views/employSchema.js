const mongoose = require('mongoose');


const EmploySchema = new mongoose.Schema({
  employname: {
    type: String,
  },
  employmail: {    
    type: String,
    sparse: true,
  },
  employpassword: {
    type: String,
    minlength: 6,
  },
  isAggriment: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Employ', EmploySchema);
