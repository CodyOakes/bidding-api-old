const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  uid: { type: String, index: true, require: true },
  email: { type: String, index: true, unique: true, require: true },
  accessLvls: [{ type: String }],
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
