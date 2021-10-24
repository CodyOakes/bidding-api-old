const { firebase } = require('../config/firebase')
const User = require('../models/user')

const authentication = async (req, res, next) => {
  const authToken = req.headers.token
  if (!authToken) {
    res.status(403).json({
      errors: [
        {
          msg: `Please Sign In to perform that function.`,
        },
      ],
    })
  }
  try {
    let user = await firebase.auth().verifyIdToken(authToken)
    req.userEmail = user.email
    next()
  } catch (error) {
    console.error(error)
    res.status(403).json({
      errors: [
        {
          msg: `Please Sign In to perform that function.`,
        },
      ],
    })
  }
}

const authorization = (requiredAccess) => async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.userEmail })
    if (!user.accessLvls) {
      return res.status(401).json({
        errors: [
          { msg: `Sorry! You are not authorized to preform that function.` },
        ],
      })
    }
    if (!user.accessLvls.includes(requiredAccess)) {
      return res.status(401).json({
        errors: [
          { msg: `Sorry! You are not authorized to preform that function.` },
        ],
      })
    }
    req.userFirstName = user.firstName || ''
    req.userLastName = user.lastName || ''
    next()
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      errors: [
        {
          msg: `Something went wrong could not find User with id: ${req.userId}`,
        },
      ],
    })
  }
}

module.exports = {
  authentication,
  authorization,
}
