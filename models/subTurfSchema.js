const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const subturfSchema = new Schema({
    turfId: { type: Schema.Types.ObjectId, ref: 'Turf' },
     subturfStartTime: { type: Date, required: true },
     subturfEndTime: { type: Date, required: true }
});
const Subturf = mongoose.model('Subturf', subturfSchema);

module.exports = { Subturf };