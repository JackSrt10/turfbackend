const Turf = require("../../models/turfListSchema")

const turfList = async (req, res) => {
    try {
        // Fetch data from MongoDB
        const turfData = await Turf.find();
        res.json(turfData);
        console.log(turfData)
    } catch (error) {
      console.log(`${error.message}`)
        res.status(500).json({ error: error.message });
    }
  };

  

  module.exports = {turfList}