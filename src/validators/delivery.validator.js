const Joi = require("joi");

const validation = Joi.object({
	delivery_id: Joi.string().required(),
    package_id: Joi.string(),
    pickup_time: Joi.date(),
    start_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    end_time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    location: Joi.object().keys({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }),
    status: Joi.string().valid('open', 'picked-up', 'in-transit', 'delivered', 'failed'),
});

const deliveryValidation = async (req, res, next) => {
	const payload = {
		delivery_id: req.body.delivery_id,
        package_id: req.body.package_id,
        pickup_time: req.body.pickup_time,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        location: req.body.location,
        status: req.body.status
	};

	const { error } = validation.validate(payload);
	if (error) {
		return res.status(422).json(error.message);
	} else {
		next();
	}
};

module.exports = deliveryValidation;