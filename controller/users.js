const User = require('../models/user')

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find({})
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [{msg: `Something went wrong, could not retrieve Users`}]
    })
  }
}

module.exports = {getUsers}