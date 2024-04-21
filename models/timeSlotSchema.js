const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for time slot
const timeSlotSchema = new Schema({
  subturfId: { type: Schema.Types.ObjectId, ref: "Subturf" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isSold: { type: Boolean, default: false },
  price: { type: Number, required: true },
});



// Create model for time slot schema
const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

// Create model for subturf schema

module.exports = {  TimeSlot };
