const express = require('express')
const app = express()
const low = require('lowdb')
const fs = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')
const adapter = new fs('db.json')
const db = low(adapter)
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//  init the data store
db.defaults({ users: [] }).write()

//  serve static files from pubic directory
app.use(express.static('public'))

// return all users
app.get('/data', function (req, res) {
  res.send(db.get('users').value())
})

// post route
app.post('/test', function (req, res) {
  console.log(req.body.username, req.body.password)
  res.send(req.body.username + ' ' + req.body.password)
})

// add user
app.post('/add', function (req, res) {
  const user = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    streetaddress: req.body.streetaddress,
    citystatezip: req.body.citystatezip,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    avatar: req.body.avatar,
  }
  db.get('users').push(user).write()
  console.log(db.get('users').value())
  res.send(db.get('users').value())
})

// start server
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
