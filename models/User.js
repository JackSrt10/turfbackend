const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt();
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// Compare the given password with the hashed password in the database
// userSchema.methods.comparePassword = async function (password) {
//   try{

//     const match = await bcrypt.compare(password, this.password);
//     return match;
//   }
//   catch(err){
//     throw new Error(err);
//   }
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
