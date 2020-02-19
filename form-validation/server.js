const express = require('express')
const app = express()
const Validate = require('./validations.js')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.post('/handle-register', function (req, res) {
  const { username, email, password } = req.body

  let validations = [
    Validate.notEmpty('username', username),
    Validate.isEmail('email', email),
    Validate.notEmpty('password', password)
  ]

  res.json(JSON.stringify({
    valid: Validate.getStatus(validations),
    validations
  }))
})

app.listen(5000)
