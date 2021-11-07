const User = require('../models/user')
const firebase = require('firebase-admin')

const { mergeUserData } = require('../utils/users')

const getAccessLvls = async (req, res, next) => {
  const { email } = req.params

  try {
    let user = await User.findOne({ email })
    res.json({
      accessLvls: user.accessLvls,
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [{ msg: `Something went wrong, could not retrieve User` }],
    })
  }
}

const getUsers = async (req, res, next) => {
  try {
    const mongoUsers = await User.find({})
    const firebaseUsers = await firebase.auth().listUsers(1000, '1')

    const users = firebaseUsers.users.map((firebaseUser) => {
      const mongoUser = mongoUsers.find(
        (user) => user.uid.toString() === firebaseUser.uid.toString()
      )
      return mergeUserData(firebaseUser, mongoUser)
    })
    res.json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [{ msg: `Something went wrong, could not retrieve Users` }],
    })
  }
}

const getUser = async (req, res, next) => {
  const { id } = req.params

  try {
    const mongoUser = await User.findOne({ uid: id })
    const firebaseUser = await firebase.auth().getUser(id)

    const user = mergeUserData(firebaseUser, mongoUser)

    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [{ msg: `Something went wrong, could not retrieve User` }],
    })
  }
}

const postUser = async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    disabled,
    type,
    address1,
    address2,
    city,
    state,
    zip,
    accessLvls,
    notes,
  } = req.body

  try {
    const firebaseUser = await firebase.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber,
      disabled,
    })

    const mongoUser = new User({
      uid: firebaseUser.uid,
      firstName,
      lastName,
      email,
      type,
      address1,
      address2,
      city,
      state,
      zip,
      accessLvls,
      notes,
    })

    await mongoUser.save()

    const user = mergeUserData(firebaseUser, mongoUser)
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [
        { msg: `${error.message}. Creating User failed, please try again` },
      ],
    })
  }
}

const patchUser = async (req, res, next) => {
  const { id } = req.params
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    disabled,
    type,
    address1,
    address2,
    city,
    state,
    zip,
    accessLvls,
    notes,
  } = req.body
  try {
    let mongoUser = await User.findOne({ uid: id })
    mongoUser.email = email
    mongoUser.firstName = firstName
    mongoUser.lastName = lastName
    mongoUser.type = type
    mongoUser.address1 = address1
    mongoUser.address2 = address2
    mongoUser.city = city
    mongoUser.state = state
    mongoUser.zip = zip
    mongoUser.accessLvls = accessLvls
    mongoUser.dnotes = accessLvls
    mongoUser.notes = notes

    const firebaseUser = await firebase.auth().updateUser(id, {
      displayName: `${firstName} ${lastName}`,
      phoneNumber,
      email,
      disabled,
      password,
    })

    await mongoUser.save()

    const user = mergeUserData(firebaseUser, mongoUser)
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [
        { msg: `${error.message}. Updating User failed, please try again` },
      ],
    })
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params

  try {
    await User.findOneAndDelete({ uid: id })
    await firebase.auth().deleteUser(id)
    res.json({ msg: `User with id: ${id} has been deleted` })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      errors: [
        { msg: `${error.message}. Deleting User failed, please try again` },
      ],
    })
  }
}

module.exports = {
  getAccessLvls,
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
}
