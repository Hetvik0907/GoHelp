const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  username:String,
  usernames: String,
  useraddress: String,
  usermobile: String,
  useremail: String,
  userservice: String,
  emailaddress: String,
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;
