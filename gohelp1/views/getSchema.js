const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const getSchema = new mongoose.Schema({
  getname: {
    type: String,
    required: true,
  },
  getemail: {
    type: String,
    required: true,
  },
  getsubject: {
    type: String,
    required: true,
  },
  getcomment:{
    type: String,
    required: true,
  }
});
getSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model('getdatas',getSchema);
