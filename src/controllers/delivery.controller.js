const DeliveryService = require('../services/delivery.service');

/**
 * @returns list of packages
 */
const findAll = async (req,res) => {
    try {
        const packages = await DeliveryService.getDelivery();
        res.json(packages);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * @params id as part of header
 * @returns a single package
 * @conditions package with the id
 * @response returns a single package
 */
const findOne = async (req,res) => {
    try {
        const package = await DeliveryService.getSingleDelivery(req.params.id);
        res.json(package);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * @returns created package
 * @body request body
 * @response returns created package
 */
const store = async (req,res) => {
    try {
        const package = await DeliveryService.create(req.body);
        res.status(201).json(package);
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
        const package = await DeliveryService.update(req.params.id, req.body);
        res.json(package);
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
        const package = await DeliveryService.deleteDelivery(req.params.id);
        res.json(package);
    } catch (error) {
        res.status(204).json({error: error.message});
    }
};


module.exports = {
    findAll, findOne, store, deleteDelivery, update
}