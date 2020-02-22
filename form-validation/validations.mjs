const NAIVE_EMAIL_REGEX = /^\S+@+.+\w{2,}$/

const createResult = (name, valid, message) => {
  return { name, valid, message }
}

export const validate = (field, validation) => {
  return validation(field)
}

export const notEmpty = (field) => {
  return field.value.trim().length > 0
    ? createResult(field.name, true, null)
    : createResult(field.name, false, `This field is required.`)
}

export const isEmail = (field) => {
  return NAIVE_EMAIL_REGEX.test(field.value)
    ? createResult(field.name, true, null)
    : createResult(field.name, false, `A valid email address is required.`)
}

export const fieldsAreValid = (fields) => {
  let response = {
    valid: true,
    validations: fields
  }
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    if (!field.valid) {
      response.valid = false
      break
    }
  }
  return response
}
