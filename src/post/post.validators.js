const Joi = require('joi');

const postValidator = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
})

module.exports = {
  postValidator: postValidator
}