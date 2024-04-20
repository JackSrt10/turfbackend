const User = require('../../models/User')
const Turf = require('../../models/turfListSchema')

const turfList = async (req, res) => {
  try {
    // Fetch data from MongoDB
    const turfData = await Turf.find()
    res.json(turfData)
    console.log(turfData)
    function generateCustomUUID() {
      function generateRandomHexDigit() {
        return Math.floor(Math.random() * 9).toString()
      }
      return (
        'TURF' +
        generateRandomHexDigit() +
        generateRandomHexDigit() +
        generateRandomHexDigit() +
        generateRandomHexDigit() +
        generateRandomHexDigit() +
        generateRandomHexDigit() +
        generateRandomHexDigit() +
        generateRandomHexDigit()
      )
    }

    console.log(generateCustomUUID())
  } catch (error) {
    console.log(`${error.message}`)
    res.status(500).json({ error: error.message })
  }
}

const profileDetails = async (req,res)=>{
  const {email} = req.query;
  try{
    const user =await User.findOne({email})
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({error:'Internal Server Error'});
  }
}


module.exports = { turfList,profileDetails }
