const mongoose = require('mongoose')

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bidding-test.f5t56.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.info('DB Connected')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB
