const express = require("express");
const userRouter = express.Router();
const { authVerify } = require("../middlewares/authVerify");
const { getWishListHandler, addItemToWishlistHandler, removeItemFromWishlistHandler } = require("../controllers/wishlist.controller");
const { getCartHandler, addItemToCartHandler, updateCartItemsHandler, removeItemFromCartHandler } = require("../controllers/cart.controller");
const { getUserAccountData, updateUserAccountData } = require("../controllers/userAccount.controller");
const { getAddressHandler, addAddressHandler, removeAddressHandler, updateAddressHandler } = require("../controllers/userAddress.controller");

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

// routes related to user's account
userRouter.route("/account")
    .get(authVerify, getUserAccountData)
    .post(authVerify, updateUserAccountData);

userRouter.route("/account/addresses")
    .get(authVerify, getAddressHandler)
    .post(authVerify, addAddressHandler)

userRouter.route("/account/addresses/:addressId")
    .post(authVerify, updateAddressHandler)
    .delete(authVerify, removeAddressHandler);

module.exports = { userRouter };
