const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    sparse: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  isAggriment:{
    type:Boolean,
    default:true,
  }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
