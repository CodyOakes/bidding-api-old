const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  uid: { type: String, index: true, require: true },
  email: { type: String, index: true, unique: true, require: true },
  type: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  accessLvls: [{ type: String }],
  notes: { type: String },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
