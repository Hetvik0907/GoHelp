const mongoose = require('mongoose');

// Define the schema
const ProviderSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  contactnumber: {
    type: String,
    required: true,
  },
  emailaddress: {
    type: String,
    required: true,
      },
      city: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['ScrapCollection', 'BabySitting', 'HouseCleaning', 'WaterTankCleaning','HandyManservice'], 
    },
  experience: {
    type: Number,
    required: true,
    // Minimum experience in years
  },
  workhour: {
    type: String,
    required: true,
      },
  uploadimage: {
    type: String,
    default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1734801006~exp=1734804606~hmac=e7888f9270668377e7e4f6b5ee43962528487984466b0d8abcfa14960503e035&w=740",
  },
  adharcard:{
    type: String,
    required: true,
  },
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;
