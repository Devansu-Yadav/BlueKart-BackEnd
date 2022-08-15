const mongoose = require("mongoose");
const { Schema } = mongoose;

const productCategorySchema = new Schema({
    _id: String,
    categoryName: String,
    image: String,
    description: String
});

const ProductCategory = mongoose.model("Category", productCategorySchema);

module.exports = { ProductCategory };