const Delivery = require("../models/delivery.model");
const { v4: uuidv4 } = require("uuid");
const Package = require("../models/package.model");
const mongoose = require("mongoose");

const getDelivery = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const deliveriesWithPackages = await Delivery.aggregate([
    {
      $lookup: {
        from: "packages", // The name of the package collection
        localField: "package_id", // Field in the delivery schema
        foreignField: "package_id", // Field in the package schema
        as: "package", // The result field
      },
    },
    {
      $unwind: "$package", // Flatten the array to include package details
    },
    {
      $skip: skip, // Skip the first (page - 1) * limit documents
    },
    {
      $limit: limit, // Limit the result to the specified number of documents
    },
  ]);

  // Get the total count of documents for pagination metadata
  const totalDocuments = await Delivery.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    totalPages,
    currentPage: page,
    deliveries: deliveriesWithPackages,
  };
};

const getSingleDelivery = async (id) => {
  const deliveryWithPackageDetails = await Delivery.aggregate([
    {
      $match: { delivery_id: id }, // Match the specific delivery by ID
    },
    {
      $lookup: {
        from: "packages", // The name of the package collection
        localField: "package_id", // Field in the delivery schema
        foreignField: "package_id", // Field in the package schema
        as: "package", // The result field
      },
    },
    {
      $unwind: "$package", // Flatten the array to include package details
    },
  ]);

  return deliveryWithPackageDetails;
};

const create = async (payload) => {
  const delivery_id = uuidv4();
  const isPackageExist = await Package.findOne({
    package_id: payload.package_id,
  });
  if (!isPackageExist) {
    throw new Error("Package with ID does not exist");
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
