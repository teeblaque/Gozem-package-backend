const PackageService = require('../services/package.service');

/**
 * @returns list of packages
 */
const findAll = async (req,res) => {
    try {
        const packages = await PackageService.getPackages();
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
        const package = await PackageService.getSinglePackage(req.params.id);
        res.json(package);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * @returns created package
 * @body request body
 * @response returns created package
 */
const store = async (req,res) => {
    try {
        const package = await PackageService.create(req.body);
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
        const package = await PackageService.update(req.params.id, req.body);
        res.status(200).json(package);
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
const deletePackage = async (req,res) => {
    try {
        const package = await PackageService.deletePackage(req.params.id);
        res.json(package);
    } catch (error) {
        res.status(204).json({error: error.message});
    }
};


module.exports = {
    findAll, findOne, store, deletePackage, update
}