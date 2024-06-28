
const express = require('express');
const PackageController = require("../controllers/package.controller");
const packageValidation = require('../validators/package.validator')

const packageRouter = express.Router();

packageRouter.get('/', PackageController.findAll);
packageRouter.get('/:id', PackageController.findOne);
packageRouter.post('/', packageValidation,  PackageController.store);
packageRouter.put('/:id',  PackageController.update);
packageRouter.delete('/:id',  PackageController.deletePackage);


module.exports = packageRouter;
