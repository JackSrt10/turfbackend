const Turf = require("../../models/turfListSchema")
const Subturf = require("../../models/subTurfSchema")
const TimeSlot = require("../../models/timeSlotSchema")

const turfAdminUser = async (req, res) => {
    const{Phone_number} = req.query;
    try {
        // Fetch data from MongoDB
        const turfData = await Turf.findOne({Phone_number});
        res.json(turfData);
        console.log(turfData)
    } catch (error) {
      console.log(`${error.message}`)
        res.status(500).json({ error: error.message });
    }
  }; 


  module.exports = {turfAdminUser}