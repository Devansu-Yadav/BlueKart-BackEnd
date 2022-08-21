const { User } = require("../models/users.model");
const { Product } = require("../models/products.model");
const mongoose = require("mongoose");

/**
 *  Private accessible routes for Cart.
 *  Client needs to add "authorization" header with JWT token in it to access it.
 */

/**
 *  @apiName GET Cart
 *  @desc Get all items in cart
 *  @route /api/user/cart
 *  @returns {Product[]} A list of all products in cart
 */

const getCartHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const { cart } = foundUser;

        if(!cart || cart.length === 0) {
            return res.status(200).json({ cart: [] });
        }

        res.json({ cart });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName POST Add to Cart
 *  @desc Add an item to cart
 *  @route /api/user/cart
 *  @apiReqBody {product} body should contain product to be added
 *  @returns {Product[]} A list of all products in cart
 */

const addItemToCartHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }
    
    const { product } = req.body;
    if(!product) {
        return res.status(400).json({ success: false, message: "Please provide product details to add in cart." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const userCart = foundUser.cart;
        const existsInCart = userCart.find(cartItem => cartItem._id === product._id) ? true: false;

        if(existsInCart) {
            return res.status(403).json({ success: false, message: "Product already in cart" });
        }

        userCart.push({
            ...product,
            createdAt: new Date(new Date().toISOString()),
            updatedAt: new Date(new Date().toISOString()),
            qty: 1
        });
        const updatedUser = await User.updateOne({ _id: userId}, { cart: userCart });

        return res.status(201).json({ cart: userCart });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });   
    }
};

/**
 *  @apiName Delete Remove item from Cart
 *  @desc Remove an item to cart
 *  @route /api/user/cart/:productId
 *  @param {string} productId Unique identifier for the specified product
 *  @returns {Product[]} A list of all products in cart
 */

const removeItemFromCartHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    const { productId } = req.params;
    const validId = mongoose.Types.ObjectId.isValid(productId);

    if(!validId) {
        return res.status(400).json({ success: false, message: "Invalid product id provided. Bad request error." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        let userCart = foundUser.cart;
        const existsInCart = userCart.find(cartItem => cartItem._id === productId) ? true: false;

        if(!existsInCart) {
            return res.status(404).json({ success: false, message: "Product does not exist in cart" });
        }

        userCart = userCart.filter((item) => item._id !== productId);
        const updatedUser = await User.updateOne({ _id: userId}, { cart: userCart });

        return res.status(201).json({ cart: userCart });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });   
    }
};

/**
 *  @apiName POST Update Cart item
 *  @desc Update an item in cart
 *  @route /api/user/cart/:productId
 *  @param {string} productId Unique identifier for the specified product
 *  @apiReqBody {action} body should contain {action} (whose 'type' can be increment or decrement)
 *  @returns {Product[]} A list of all products in cart
 */

const updateCartItemsHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    const { productId } = req.params;
    const validId = mongoose.Types.ObjectId.isValid(productId);

    if(!validId) {
        return res.status(400).json({ success: false, message: "Invalid product id provided. Bad request error." });
    }

    const { action } = req.body;
    if(!action) {
        return res.status(400).json({ success: false, message: "Please provide action to perform on cart item." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const userCart = foundUser.cart;
        const existsInCart = userCart.find(cartItem => cartItem._id === productId) ? true: false;

        if(!existsInCart) {
            return res.status(404).json({ success: false, message: "Product does not exist in cart" });
        }

        if(action.type === "increment") {
            userCart.forEach((product) => {
                if (product._id === productId) {
                  product.qty += 1;
                  product.updatedAt = new Date(new Date().toISOString());
                }
            });
        } else if (action.type === "decrement") {
            userCart.forEach((product) => {
                if (product._id === productId) {
                    product.qty -= 1;
                    product.updatedAt = new Date(new Date().toISOString());
                }
            });
        } 

        const updatedUser = await User.updateOne({ _id: userId}, { cart: userCart });
        return res.json({ cart: userCart });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });      
    }
};

module.exports = { getCartHandler, addItemToCartHandler, updateCartItemsHandler, removeItemFromCartHandler };
