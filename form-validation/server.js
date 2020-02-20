const express = require('express')
const app = express()
const Validate = require('./validations.js')

const formatErrors = (validations) => {
  let message = 'Oops we missed some information:\n'
  for (let i = 0; i < validations.length; i++) {
    const field = validations[i];
    message += `${field.name}: ${field.message}\n`
  }
  return message + 'If we had a templating language we could make this look much nicer!'
}

const simpleResponse = (valid, validations) => {
  return valid
    ? 'Successfully Registered!'
    : formatErrors(validations)
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.post('/handle-register', function (req, res) {
  const { username, email, password, XHR } = req.body

  let validations = [
    Validate.notEmpty('username', username),
    Validate.isEmail('email', email),
    Validate.notEmpty('password', password)
  ]

  const valid = Validate.getStatus(validations)
  XHR
    ? res.json(JSON.stringify({ valid, validations}))
    : res.send(simpleResponse(valid, validations))
})

app.listen(5000)
