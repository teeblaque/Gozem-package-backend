const DeliveryService = require('../services/delivery.service');
/**
 * @returns list of deliveries
 */
const findAll = async (req,res) => {
    try {
        const deliveries = await DeliveryService.getDelivery(parseInt(req.query.page ?? 1), parseInt(req.query.limit ?? 10));
        res.json(deliveries);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * @params id as part of header
 * @returns a single delivery
 * @conditions delivery with the id
 * @response returns a single delivery
 */
const findOne = async (req,res) => {
    try {
        const delivery = await DeliveryService.getSingleDelivery(req.params.id);
        res.json(delivery);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * @returns created delivery
 * @body request body
 * @response returns created delivery
 */
const store = async (req,res) => {
    try {
        const delivery = await DeliveryService.create(req.body);
        res.status(201).json(delivery);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * @params id as part of header
 * @returns created package
 * @body request body
 * @response returns updated package
 */
const update = async (req,res) => {
    try {
        const delivery = await DeliveryService.update(req.params.id, req.body);
        res.json(delivery);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * @params id as part of header
 * @returns created package
 * @body request body
 * @response returns updated package
 */
const deleteDelivery = async (req,res) => {
    try {
        const delivery = await DeliveryService.deleteDelivery(req.params.id);
        res.json(delivery);
    } catch (error) {
        res.status(204).json({error: error.message});
    }
};


module.exports = {
    findAll, findOne, store, deleteDelivery, update
}