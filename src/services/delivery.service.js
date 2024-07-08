const Delivery = require("../models/delivery.model");
const { v4: uuidv4 } = require("uuid");
const Package = require("../models/package.model");

const getDelivery = async () => {
  const delivery = await Delivery.find();
  return delivery;
};

const getSingleDelivery = async (id) => {
  const delivery = await Delivery.findById(id);
  return delivery;
};

const create = async (payload) => {
  const delivery_id = uuidv4();
  const isPackageExist = await Package.findOne({ package_id: payload.package_id});
  if (!isPackageExist) {
    throw new Error('Package with ID does not exist');
  }
  const data = {
    ...payload,
    delivery_id,
  };
  const delivery = new Delivery(data);
  return await delivery.save();
};

const update = async (id, payload) => {
  const delivery = await Delivery.findByIdAndUpdate(id, payload, { new: true });
  return delivery;
};

const deleteDelivery = async (id) => {
  const delivery = await Delivery.findByIdAndDelete(id);
  return "Delivery detail deleted successfully";
};

module.exports = {
  getDelivery,
  getSingleDelivery,
  create,
  update,
  deleteDelivery,
};
