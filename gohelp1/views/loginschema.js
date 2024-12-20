const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
});
UserSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model('User', UserSchema);
