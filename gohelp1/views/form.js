const mongoose = require('mongoose');

// Define the schema
const ProviderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, 
  },
  emailAddress: {
    type: String,
    required: true,
      },
  city: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Scrap Collection', 'Baby Sitting', 'House Cleaning', 'WaterTank Cleaning','HandyMan service'], 
    },
  experience: {
    type: Number,
    required: true,
    min: 0, // Minimum experience in years
  },
  workHour: {
    type: String,
    required: true,
      },
  uploadImage: {
    type: String,
    default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1734801006~exp=1734804606~hmac=e7888f9270668377e7e4f6b5ee43962528487984466b0d8abcfa14960503e035&w=740",
  },
  adharCardNumber:{
    type: String,
    required: true,
    match: /^[2-9]{1}[0-9]{11}$/,
  },
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;
