const jwt = require("jsonwebtoken")
const config = require('../config/index');

const accessTokenSecret = config.ACCESS_TOKEN_SECRET || "access-token-secret-example-bau-cua-tom-ca";

let isAuth = async (req, res, next) => {

  const tokenFromClient = req.body.accessToken || req.query.accessToken || req.cookie.accessToken || req.headers["x-access-token"];
  if (tokenFromClient) {

    try {

      const decoded = await verifyToken(tokenFromClient, accessTokenSecret);

      req.jwtDecoded = decoded;

      next();
    } catch (error) {

      
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
module.exports = {
  isAuth: isAuth,
};


let verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }