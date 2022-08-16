const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    _id: String,
    productName: String,
    brand: String,
    image: String,
    price: Number,
    discountPercent: Number,
    rating: String,
    isOutOfStock: Boolean,
    features: Object,
    description: String
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };