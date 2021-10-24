const mergeUserData = (firebaseUser, mongoUser) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  phoneNumber: firebaseUser.phoneNumber,
  disabled: firebaseUser.disabled,
  accessLvls: mongoUser.accessLvls,
  creationTime: firebaseUser.metadata.creationTime,
  lastSignInTime: firebaseUser.metadata.lastSignInTime,
  lastRefreshTime: firebaseUser.metadata.lastRefreshTime,
})

module.exports = { mergeUserData }
