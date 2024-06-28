const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
    delivery_id: { type: String, required: true, unique: true },
    package_id: { type: String, required: true },
    pickup_time: { type: Date },
    start_time: { type: Date },
    end_time: { type: Date },
    location: { lat: Number, lng: Number },
    status: { type: String, enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'] }
});

const Delivery = mongoose.model('Delivery', DeliverySchema);
module.exports = Delivery;