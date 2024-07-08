const Joi = require("joi");

const validation = Joi.object({
  active_delivery_id: Joi.optional(),
  description: Joi.string(),
  weight: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  depth: Joi.number(),
  from_name: Joi.string().required(),
  from_address: Joi.string().required(),
  from_location: Joi.object()
    .keys({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    })
    .required(),
  to_name: Joi.string().required(),
  to_address: Joi.string().required(),
  to_location: Joi.object()
    .keys({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    })
    .required(),
});

const packageValidation = async (req, res, next) => {
  const payload = {
    active_delivery_id: req.body.active_delivery_id,
    description: req.body.description,
    weight: req.body.weight,
    width: req.body.width,
    height: req.body.height,
    depth: req.body.depth,
    from_name: req.body.from_name,
    from_address: req.body.from_address,
    from_location: req.body.from_location,
    to_name: req.body.to_name,
    to_address: req.body.to_address,
    to_location: req.body.to_location,
  };

  const { error } = validation.validate(payload);
  if (error) {
    return res.status(422).json(error.message);
  } else {
    next();
  }
};

module.exports = packageValidation;
