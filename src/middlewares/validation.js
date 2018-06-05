const Joi = require('joi');

const validationMiddleware = (schema) => {
  return function (req, res, next) {
    Joi.validate(req.body, schema, (err, value) => {
      if (err !== null) {
        res.status(400).send(err);
      } else {
        next()
      }
    });
  }
}

module.exports = validationMiddleware;