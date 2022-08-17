const { getDecodedDataFromToken } = require("../helpers/authUtils");

const authVerify = (req, res, next) => {
    let token = req.headers.authorization;

    if (token) {
        token = token.split(" ")[1];
        console.log(token);
        
        try {
            const decoded = getDecodedDataFromToken(token);
            console.log(decoded);
    
            req.user = { _id: decoded._id };
            return next();
        } catch(err) {
            return res.status(403).json({ success: false, message: "Invalid token!" });
        }
    }

    return res.status(401).json({ success: false, message: "No auth token present!" });
};

module.exports = { authVerify };