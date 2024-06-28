
const express = require('express');
const DeliveryController = require("../controllers/delivery.controller");
const deliveryValidation = require('../validators/delivery.validator')

const packageRouter = express.Router();

packageRouter.get('/', DeliveryController.findAll);
packageRouter.get('/:id', DeliveryController.findOne);
packageRouter.post('/', deliveryValidation,  DeliveryController.store);
packageRouter.put('/:id',  DeliveryController.update);
packageRouter.delete('/:id',  DeliveryController.deleteDelivery);


module.exports = packageRouter;
