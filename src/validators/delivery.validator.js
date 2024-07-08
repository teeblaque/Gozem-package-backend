const Joi = require("joi");

const validation = Joi.object({
  package_id: Joi.string().required(),
  pickup_time: Joi.date(),
  start_time: Joi.date(),
  end_time: Joi.date(),
  location: Joi.object().keys({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }),
  status: Joi.string().valid(
    "open",
    "picked-up",
    "in-transit",
    "delivered",
    "failed"
  ),
}).required();

const deliveryValidation = async (req, res, next) => {
  const payload = {
    package_id: req.body.package_id,
    pickup_time: req.body.pickup_time,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    location: req.body.location,
    status: req.body.status,
  };

  const { error } = validation.validate(payload);
  if (error) {
    return res.status(422).json(error.message);
  } else {
    next();
  }
};

module.exports = deliveryValidation;
