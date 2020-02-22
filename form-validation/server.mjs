import {
  validate,
  notEmpty,
  isEmail,
  fieldsAreValid
} from './validations.mjs'
import express from 'express'
const app = express()
// const Validate = require('./validations.js')

const formatErrors = (validations) => {
  let message = 'Oops we missed some information:\n'
  for (let i = 0; i < validations.length; i++) {
    const field = validations[i];
    message += `${field.name}: ${field.message}\n`
  }
  return message + 'If we had a templating language we could make this look much nicer!'
}

const simpleResponse = (result) => {
  return result.valid
    ? 'Successfully Registered!'
    : formatErrors(result.validations)
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.post('/handle-register', function (req, res) {
  const { username, email, password, XHR } = req.body

  const result = fieldsAreValid([
    validate({ name: 'Username', value: username }, notEmpty),
    validate({ name: 'Email', value: email }, isEmail),
    validate({ name: 'Password', value: password }, notEmpty)
  ])

  console.log(result)

  XHR
    ? res.json(JSON.stringify(result))
    : res.send(simpleResponse(result))
})

app.listen(5000)
