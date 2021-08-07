const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firebaseId: {type: String}, 
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  accessLvls: [{type: String}],
})

module.exports = mongoose.model('User', userSchema)

