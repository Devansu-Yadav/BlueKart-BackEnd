const express = require("express");
const userRouter = express.Router();
const { authVerify } = require("../middlewares/authVerify");
const { getWishListHandler, addItemToWishlistHandler, removeItemFromWishlistHandler } = require("../controllers/wishlist.controller");
const { getCartHandler, addItemToCartHandler, updateCartItemsHandler, removeItemFromCartHandler } = require("../controllers/cart.controller");

// routes related to user's wishlist
userRouter.route("/wishlist")
    .get(authVerify, getWishListHandler)
    .post(authVerify, addItemToWishlistHandler);

userRouter.route("/wishlist/:productId")
    .delete(authVerify, removeItemFromWishlistHandler);

// routes related to user's cart
userRouter.route("/cart")
    .get(authVerify, getCartHandler)
    .post(authVerify, addItemToCartHandler);

userRouter.route("/cart/:productId")
    .post(authVerify, updateCartItemsHandler)
    .delete(authVerify, removeItemFromCartHandler);

module.exports = { userRouter };
