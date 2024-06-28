const Delivery = require("../models/delivery.model");

const getDelivery = async () => {
    const delivery = await Delivery.find();
    return delivery;
};

const getSingleDelivery = async (id) => {
    const delivery = await Delivery.findById(id);
    return delivery;
};

const create = async (payload) => {
    const delivery = new Delivery();
    return await delivery.save(payload);
};

const update = async (id, payload) => {
    const delivery = await Delivery.findByIdAndUpdate(id, payload, { new: true });
    return delivery;
};

const deleteDelivery = async (id) => {
    const delivery = await Delivery.findByIdAndDelete(id);
    return 'Delivery detail deleted successfully';
};

module.exports = {
    getDelivery, getSingleDelivery, create, update, deleteDelivery
};
