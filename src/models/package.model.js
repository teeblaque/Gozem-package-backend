const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    package_id: { type: String, required: true, unique: true },
    active_delivery_id: { type: String },
    description: { type: String },
    weight: { type: Number },
    width: { type: Number },
    height: { type: Number },
    depth: { type: Number },
    from_name: { type: String },
    from_address: { type: String },
    from_location: { lat: Number, lng: Number },
    to_name: { type: String },
    to_address: { type: String },
    to_location: { lat: Number, lng: Number }
});

const Package = mongoose.model('Package', PackageSchema);
module.exports = Package;