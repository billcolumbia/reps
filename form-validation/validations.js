const NAIVE_EMAIL_REGEX = /^\S+@+.+\w{2,}$/

const ValidationResult = (name, valid, message) => {
  return { name, valid, message }
}

const notEmpty = (key, value) => {
  return value.trim().length > 0
    ? ValidationResult(key, true, null)
    : ValidationResult(key, false, `This field is required.`)
}

const isEmail = (key, value) => {
  return NAIVE_EMAIL_REGEX.test(value)
    ? ValidationResult(key, true, null)
    : ValidationResult(key, false, `A valid email address is required.`)
}

const getStatus = (fields) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (!field.valid) return false
  }
  return true
}

const Validations = {
  notEmpty,
  isEmail,
  getStatus
}

module.exports = Validations
