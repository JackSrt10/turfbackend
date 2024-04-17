const mongoose = require('mongoose');
 

// Define a schema for your MongoDB collection
const turfSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone_number: {
        type: String,
        required: true
    },
    Sports_Available: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Turf_name: {
        type: String,
        required: true
    },
    Turf_Amenities: {
        
        type: String,
        required: true
    },
    Turf_Images: {
        type: String,
        required: true
    },
    Email_Address: {
        type: String,
        required: true,
    }
});

const Turf = mongoose.model('Turf', turfSchema);

module.exports=Turf;