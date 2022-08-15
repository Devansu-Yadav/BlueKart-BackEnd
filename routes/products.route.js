const express = require("express");
const productsRouter = express.Router();
const { getAllProducts, getProduct } = require("../controllers/products.controller");

// routes related to products
productsRouter.route("/")
    .get(getAllProducts);

productsRouter.route("/:productId")
    .get(getProduct);

module.exports = { productsRouter };