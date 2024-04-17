const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const otpModel = require('../../models/otp')
const Turf = require('../../models/turfListSchema')
const Twilio = require('twilio')
const mongoose = require('mongoose');
const { use } = require('../../routes/auth')


// Register a new user
const register = async (req, res, next) => {
  const { username, email } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    const twilioClient = new Twilio(
      process.env.accountSid,
  process.env.authToken
    )
    const message = await twilioClient.messages.create({
      body: `Your Registration OTP is: ${otp}`,
      to: '+91' + email,
      from: '+12015716037',
    })
    console.log('otp sent successfully with id : ', message.sid)

    res.status(200).json({ message: 'OTP sent successfully' })
    const Otp = new otpModel({
      contactNo: email,
      otp: otp,
    })
    await Otp.save()
    return true
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// app.post('/verify-otp',
const verifySignUpOtp = async (req, res) => {
  const { username, email, otp } = req.body

  try {
    const user = await User.findOne({ email })

    // Find user by mobile number
    console.log(`this is email/phone : ${email}`)

    const otpData = await otpModel.findOne({
      contactNo: email,
    })

    // Check if OTP matches
    if (otpData.otp === otp) {
      res.status(200).json({
        message: 'verified succesfully',
      })
      const newUser = new User({ username, email })
      await newUser.save()
    } else {
      return res.status(400).json({ message: 'Invalid OTP' })
    }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const verifyLoginOtp = async (req, res) => {
  const { username, email, otp } = req.body

  try {
    const user = await User.findOne({ email })

    // Find user by mobile number
    console.log(`this is email/phone : ${email}`)

    const otpData = await otpModel.findOne({
      contactNo: email,
    })

    // Check if OTP matches
    if (otpData.otp === otp) {
      res.status(200).json({
        message: 'verified succesfully',
      })
    } else {
      return res.status(400).json({ message: 'Invalid OTP' })
    }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Login with an existing user
const login = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    const OtpStatus = await sendOTP(email)
    console.log(OtpStatus)

    if (OtpStatus === true) {
      res.status(200).json({
        message: `OTP sent successfully`,
        username: user.username,
      })
    } else {
      console.log('Failed to send OTP')
      res.status(401).json({
        message: 'Failed to send OTP',
      })
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
}

const client = new Twilio(
  process.env.accountSid,
  process.env.authToken,
)
const sendOTP = async (number) => {
  console.log('sending sms to : ', number)
  const randomOtp = Math.floor(1000 + Math.random() * 9000)

  try {
    const message = await client.messages.create({
      body: `Your Turf OTP is ${randomOtp}. OTP will expire in 5 minutes.`,
      // twilio phone number
      from: '+12015716037',
      to: '+91' + number,
    })

    console.log('otp sent successfully with id : ', message.sid)

    const otp = new otpModel({
      contactNo: number,
      otp: randomOtp,
    })

    await otp.save()
    return true
  } catch (error) {
    console.error('Error sending OTP:', error)
    return false
  }
}

// turf list

// const turfList = async (req, res) => {
//   try {
//       // Fetch data from MongoDB
//       const turfData = await Turf.find();
//       res.json(turfData);
//       console.log(turfData)
//   } catch (error) {
//     console.log(`${error.message}`)
//       res.status(500).json({ error: error.message });
//   }
// };

module.exports = { register, login, verifySignUpOtp,verifyLoginOtp }
