require('dotenv').config()
const path = require('path')
const connectDB = require('./config/db')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const staticSite = path.join(__dirname, 'build')
const usersRoutes = require('./routes/users')

app.use(express.json())
app.use(express.static(staticSite))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use('/api/users', usersRoutes)

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res
    .status(error.code || 500)
    .json({ msg: error.message || 'An unknown error occured!' })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(staticSite, 'index.html'))
})

connectDB()
app.listen(PORT, () =>
  console.info(`Server up on port: ${PORT}, ENV: ${process.env.NODE_NV}`)
)
