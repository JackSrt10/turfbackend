import  mongoose from "mongoose";
const userDetails = mongoose.Schema({
    uid:{
        type:int,
        required:true
    },
    userName:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    emailPhone:{
        type:any,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    // date is specified by you
    date:{
        type:Date,
        default: new Date(),
    }
})
/* this is otp schema */

const otpSchema = mongoose.Schema({
    contactNo:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        index:{expires:300} // it will automatically get deleted after 5 mins
    }
});

// Turf Listing //

const turfList = mongoose.Schema({
    tId:{
        type: String,
        required: true,
        unique : true
    },
    turfAdminId:{
        type:String,
        required:true,
    },
    turfName:{
        type: String,
        required: true,
    },
    turfAddress:{
        type:String,
        required:true
    },
    // here the image will be stored in cloudinary for more info  
    // visit https://www.cloudinary.com/
    turfImage:{
        type:String,
        required:true
    },
    RegistrationDate: {
        type: Date,
        default: Date.now
      }

});
const Turf = mongoose.model('Turf', turfList);


const timeSlotSchema = new mongoose.Schema({
    TimeSlotID: {
      type: Number,
      required: true
    },
    StartTime: {
      type: String,
      required: true
    },
    EndTime: {
      type: String,
      required: true
    },
    TurfID: {
      type: Number,
      required: true
    }
  });
  const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);



  const bookingSchema = new mongoose.Schema({
    BookingID: {
      type: Number,
      required: true
    },
    UserID: {
      type: Number,
      required: true
    },
    TurfID: {
      type: Number,
      required: true
    },
    TimeSlotID: {
      type: Number,
      required: true
    },
    BookingDate: {
      type: Date,
      required: true
    }
  });

  const Booking = mongoose.model('Booking', bookingSchema);

  const bookingReviewSchema = new mongoose.Schema({
    ReviewID: {
      type: Number,
      required: true
    },
    BookingID: {
      type: Number,
      required: true
    },
    Rating: {
      type: Number,
      required: true
    },
    ReviewText: {
      type: String
    }
  });
  
  const BookingReview = mongoose.model('BookingReview', bookingReviewSchema);
  
  
  const promotionSchema = new mongoose.Schema({
    PromotionID: {
      type: Number,
      required: true
    },
    Name: {
      type: String,
      required: true
    },
    Description: {
      type: String
    },
    StartDate: {
      type: Date,
      required: true
    },
    EndDate: {
      type: Date,
      required: true
    },
    Discount: {
      type: Number,
      required: true
    }
  });
  
  const Promotion = mongoose.model('Promotion', promotionSchema);

  const notificationSchema = new mongoose.Schema({
    NotificationID: {
      type: Number,
      required: true
    },
    UserID: {
      type: Number,
      required: true
    },
    Message: {
      type: String,
      required: true
    },
    CreatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Notification = mongoose.model('Notification', notificationSchema);
  
