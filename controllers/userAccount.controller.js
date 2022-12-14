const { User } = require("../models/users.model");

/**
 *  Private accessible routes for User account.
 *  Client needs to add "authorization" header with JWT token in it to access it.
 */

/**
 *  @apiName GET User data
 *  @desc Get user's account data
 *  @route /api/user/account
 *  @returns {User} User account data
 */

const getUserAccountData = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    try {
        const foundUser = await User.findOne({ _id: userId });

        if(!foundUser) {
            return res.status(404).json({ success: false, message: "Could not find user data. Please try again!" });
        }

        return res.json({ userData: foundUser });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

/**
 *  @apiName POST Update user profile
 *  @desc Update user profile details.
 *  @route /api/user/account
 *  @apiReqBody {userData} Updated user data
 *  @returns {User} User account data
 */

const updateUserAccountData = async (req, res) => {
    const userId = req.user._id;

    if(!userId) {
        return res.status(404).json({ success: false, message: "The email you entered is not Registered. Not Found error" });
    }

    const { userData } = req.body;
    if(!userData) {
        return res.status(400).json({ success: false, message: "Please provide the updated user data." });
    }

    const { firstName, lastName, email } = userData;

    try {
        const foundUser = await User.findOne({ _id: userId });

        if(!foundUser) {
            return res.status(404).json({ success: false, message: "Could not find user data. Please try again!" });
        }

        if(firstName) {
            foundUser.firstName = firstName;
        }

        if(lastName) {
            foundUser.lastName = lastName;
        }

        if(email) {
            foundUser.email = email;
        }

        const updatedUser = await User.updateOne({ _id: userId}, foundUser);

        return res.json({ userData: foundUser });
    } catch(err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getUserAccountData, updateUserAccountData };
