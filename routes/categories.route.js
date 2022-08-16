const express = require("express");
const productCategoryRouter = express.Router();
const { getAllProductCategories, getProductCategory } = require("../controllers/categories.controller");

// routes related to categories
productCategoryRouter.route("/")
    .get(getAllProductCategories);

productCategoryRouter.route("/:categoryId")
    .get(getProductCategory);

module.exports = { productCategoryRouter };