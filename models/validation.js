const Joi = require('joi')

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/).required(),
})

const validate = (newUser) => {
  const result = Joi.validate(newUser, schema)
  switch (result.error) {
    case null:
      return true
    default:
      return false
  }
}

module.exports = {
  validate,
}