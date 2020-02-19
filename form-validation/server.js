const express = require('express')
const app = express()
 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.post('/handle-form', function (req, res) {
  const { username, email, password } = req.body
  res.json(JSON.stringify({
    username: username,
    email: email,
    password: password
  }))
})
 
app.listen(5000)