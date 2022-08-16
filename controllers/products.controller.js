const { Product } = require("../models/products.model");
const mongoose = require("mongoose");

/**
 *  Publicly accessible routes for products
 */

/**
 *  @apiName GET Products
 *  @desc Get all products
 *  @route /api/products
 *  @returns {Product[]} A list of all products
 */

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        if(!products) {
            return res.status(200).json({ products: [] });
        }

        return res.json({ products });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName GET product
 *  @desc Get a product
 *  @route /api/products/:productId
 *  @param {string} productId Unique identifier for the specified product
 *  @returns {Product} A product specified by user
 */

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const validId = mongoose.Types.ObjectId.isValid(productId);

        if(validId) {
            const product = await Product.findById(productId);

            if(product) {
                return res.json({ product });
            }
            return res.status(404).json({ success: false, message: "Cannot find product" });
        }
        return res.status(400).json({ success: false, message: "Bad Request. Invalid product id provided." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllProducts, getProduct };
