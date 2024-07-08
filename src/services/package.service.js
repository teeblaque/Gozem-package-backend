const Package = require("../models/package.model");
const { v4: uuidv4 } = require("uuid");

const getPackages = async () => {
  const packages = await Package.find();
  return packages;
};

const getSinglePackage = async (id) => {
  try {
    const package = await Package.findById(id);
    if (!package) {
      throw new Error("Package not found");
    }
    return package;
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (payload) => {
  const package_id = uuidv4();
  const data = {
    ...payload,
    package_id,
  };
  const package = new Package(data);
  return await package.save();
};

const update = async (id, payload) => {
  const package = await Package.findByIdAndUpdate(id, payload, { new: true });
  return package;
};

const deletePackage = async (id) => {
  const package = await Package.findByIdAndDelete(id);
  return "Package deleted successfully";
};

module.exports = {
  getPackages,
  getSinglePackage,
  create,
  update,
  deletePackage,
};
