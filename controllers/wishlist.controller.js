const { User } = require("../models/users.model");
const { Product } = require("../models/products.model");
const mongoose = require("mongoose");

/**
 *  Private accessible routes for Wishlist.
 *  Client needs to add "authorization" header with JWT token in it to access it.
 */

/**
 *  @apiName GET Wishlist
 *  @desc Get all items in wishlist
 *  @route /api/user/wishlist
 *  @returns {Product[]} A list of all products in wishlist
 */

const getWishListHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const { wishlist } = foundUser;

        if(!wishlist || wishlist.length === 0) {
            return res.status(200).json({ wishlist: [] });
        }

        res.json({ wishlist });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName POST Add to Wishlist
 *  @desc Add an item to wishlist
 *  @route /api/user/wishlist
 *  @apiReqBody {product} body should contain product to be added
 *  @returns {Product[]} A list of all products in wishlist
 */

const addItemToWishlistHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }
    
    const { product } = req.body;
    if(!product) {
        return res.status(400).json({ success: false, message: "Please provide product details to add in wishlist." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const userWishlist = foundUser.wishlist;
        const existsInWishlist = userWishlist.find(wishListItem => wishListItem._id === product._id) ? true: false;

        if(existsInWishlist) {
            return res.status(403).json({ success: false, message: "Product already in wishlist" });
        }

        userWishlist.push({
            ...product,
            createdAt: new Date(new Date().toISOString()),
            updatedAt: new Date(new Date().toISOString())
        });
        const updatedUser = await User.updateOne({ _id: userId}, { wishlist: userWishlist });

        return res.status(201).json({ wishlist: userWishlist });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });   
    }
};

/**
 *  @apiName Delete Remove item from Wishlist
 *  @desc Remove an item to wishlist
 *  @route /api/user/wishlist/:productId
 *  @param {string} productId Unique identifier for the specified product
 *  @returns {Product[]} A list of all products in wishlist
 */

const removeItemFromWishlistHandler = async (req, res) => {
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
        let userWishlist = foundUser.wishlist;
        const existsInWishlist = userWishlist.find(wishListItem => wishListItem._id === productId) ? true: false;

        if(!existsInWishlist) {
            return res.status(404).json({ success: false, message: "Product does not exist in wishlist" });
        }

        userWishlist = userWishlist.filter((item) => item._id !== productId);
        const updatedUser = await User.updateOne({ _id: userId}, { wishlist: userWishlist });

        return res.status(201).json({ wishlist: userWishlist });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });         
    }
};

module.exports = { getWishListHandler, addItemToWishlistHandler, removeItemFromWishlistHandler };
