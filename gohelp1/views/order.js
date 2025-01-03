const mongoose = require("mongoose");
const moment = require("moment-timezone");

// Define the Request schema
const RequestSchema = new mongoose.Schema({
  username: String,
  usernames: String,
  useraddress: String,
  usermobile: String,
  useremail: String,
  userservice: String,
  emailaddress: String,
  status: {
    type: String,
    default: "Pending", // Default status
  },
  time: {
    type: String, // Store time as a string
    default: () => moment.tz(Date.now(), "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"), // Set default to IST time
  },
});

// Create the Request model
const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
