const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    cart: Array,
    wishlist: Array,
    addresses: Array
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
