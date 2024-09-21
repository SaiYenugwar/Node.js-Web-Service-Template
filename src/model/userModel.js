const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    required: true,
    default: true
  },
  createdDate:{
    type:Date,
    required: true,
    default: Date.now
  },
  updatedDate:{
    type:Date,
  },
  lastLogin:{
    type:Date,
    required: true,
    default: Date.now
  },
});


const User = mongoose.model('User', userSchema);

module.exports = User;
