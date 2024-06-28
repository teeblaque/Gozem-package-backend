const Package = require("../models/package.model");

const getPackages = async () => {
    const packages = await Package.find();
    return packages;
};

const getSinglePackage = async (id) => {
    const package = await Package.findById(id);
    return package;
};

const create = async (payload) => {
    const package = new Package();
    return await package.save(payload);
};

const update = async (id, payload) => {
    const package = await Package.findByIdAndUpdate(id, payload, { new: true });
    return package;
};

const deletePackage = async (id) => {
    const package = await Package.findByIdAndDelete(id);
    return 'Package deleted successfully';
};

module.exports = {
  getPackages, getSinglePackage, create, update, deletePackage
};
