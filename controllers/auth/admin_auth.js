const otpModel = require('../../models/otp')
const Turf = require('../../models/turfListSchema')
const Twilio = require('twilio')


const login = async (req, res) => {
    const { mobile_number } = req.body
  
    const user = await Turf.findOne({ Phone_number: mobile_number })
    console.log(`${user.Phone_number}`);
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
  
    try {
      const OtpStatus = await sendOTP(mobile_number)
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

  const verifyLoginOtp = async (req, res) => {
    const { username, mobile_number, otp } = req.body
  
    try {
      const user = await Turf.findOne({ mobile_number })
  
      // Find user by mobile number
      console.log(`this is email/phone : ${mobile_number}`)
  
      const otpData = await otpModel.findOne({
        contactNo: mobile_number,
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

  module.exports = { login,verifyLoginOtp }