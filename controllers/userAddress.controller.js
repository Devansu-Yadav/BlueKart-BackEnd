const { User } = require("../models/users.model");
const mongoose = require("mongoose");
const mongo = require("mongodb");

/**
 *  Private accessible routes for User's saved addresses.
 *  Client needs to add "authorization" header with JWT token in it to access it.
 */

/**
 *  @apiName GET User's addresses
 *  @desc Get user's saved addresses
 *  @route /api/user/account/addresses
 *  @returns {Array} A list of user's saved addresses
 */

const getAddressHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const { addresses } = foundUser;

        if(!addresses || addresses.length === 0) {
            return res.json({ addresses: [] });
        }

        res.json({ addresses });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName POST Add Address
 *  @desc Add an address to user's saved addresses
 *  @route /api/user/account/addresses
 *  @apiReqBody {address} body should contain address to be added
 *  @returns {Array} A list of user's saved addresses
 */

const addAddressHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    const { address } = req.body;
    if(!address) {
        return res.status(400).json({ success: false, message: "Please provide an address to save." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        const userAddresses = foundUser.addresses;

        userAddresses.push({
            _id: mongo.ObjectId().toString(),
            ...address,
            createdAt: new Date(new Date().toISOString()),
            updatedAt: new Date(new Date().toISOString())
        });
        const updatedUser = await User.updateOne({ _id: userId}, { addresses: userAddresses });

        return res.status(201).json({ addresses: userAddresses });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName DELETE Remove address from user's saved addresses
 *  @desc Remove an address from user's saved addresses
 *  @route /api/user/account/addresses/:addressId
 *  @param {string} addressId Unique identifier for the specified address
 *  @returns {Array} A list of user's saved addresses
 */

const removeAddressHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    const { addressId } = req.params;
    const validId = mongoose.Types.ObjectId.isValid(addressId);

    if(!validId) {
        return res.status(400).json({ success: false, message: "Invalid address id provided. Bad request error." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        let userAddresses = foundUser.addresses;
        const existsInAddresses = userAddresses.find(savedAddress => savedAddress._id === addressId) ? true: false;

        if(!existsInAddresses) {
            return res.status(404).json({ success: false, message: "Address does not exist in saved addresses." });
        }

        userAddresses = userAddresses.filter((item) => item._id !== addressId);
        const updatedUser = await User.updateOne({ _id: userId}, { addresses: userAddresses });

        return res.status(201).json({ addresses: userAddresses });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName POST Update Address
 *  @desc Update an address in user's saved addresses.
 *  @route /api/user/account/addresses/:addressId
 *  @param addressId Unique identifier for the specified address
 *  @apiReqBody {address} Updated address data
 *  @returns {Array} A list of user's saved addresses
 */

const updateAddressHandler = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    const { addressId } = req.params;
    const validId = mongoose.Types.ObjectId.isValid(addressId);

    if(!validId) {
        return res.status(400).json({ success: false, message: "Invalid address id provided. Bad request error." });
    }

    const { address } = req.body;
    if(!address) {
        return res.status(400).json({ success: false, message: "Please provide the updated address data." });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });
        let userAddresses = foundUser.addresses;
        const existsInAddresses = userAddresses.find(savedAddress => savedAddress._id === addressId) ? true: false;

        if(!existsInAddresses) {
            return res.status(404).json({ success: false, message: "Address does not exist in user's saved addresses." });
        }

        userAddresses = userAddresses.reduce((updatedUserAddresses, currAddress) => 
        currAddress._id === addressId ? [...updatedUserAddresses, { _id: addressId, ...address, createdAt: new Date(new Date().toISOString()), updatedAt: new Date(new Date().toISOString()) }]: 
        [...updatedUserAddresses, currAddress], []);

        const updatedUser = await User.updateOne({ _id: userId}, { addresses: userAddresses });

        return res.status(201).json({ addresses: userAddresses });      
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });      
    }
};

module.exports = { getAddressHandler, addAddressHandler, removeAddressHandler, updateAddressHandler };
