const { ProductCategory } = require("../models/categories.model");
const mongoose = require("mongoose");

/**
 *  Publicly accessible routes for product categories
 */

/**
 *  @apiName GET Product categories
 *  @desc Get all product categories
 *  @route /api/categories
 *  @returns {ProductCategory[]} A list of all product categories
 */

const getAllProductCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.find({});

        if(!categories) {
            return res.status(200).json({ categories: [] });
        }

        return res.json({ categories });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName GET product category
 *  @desc Get a product category
 *  @route /api/categories/:categoryId
 *  @param {string} categoryId Unique identifier for the specified product category
 *  @returns {ProductCategory} A product category specified by user
 */

const getProductCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const validId = mongoose.Types.ObjectId.isValid(categoryId);

        if(validId) {
            const category = await ProductCategory.findById(categoryId);

            if(category) {
                return res.json({ category });
            }
            return res.status(404).json({ success: false, message: "Cannot find product category. Not Found error." });
        }

        return res.status(400).json({ success: false, message: "Invalid product category id provided. Bad Request error." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getAllProductCategories, getProductCategory };
