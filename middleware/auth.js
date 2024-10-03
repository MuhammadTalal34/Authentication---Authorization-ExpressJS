const config = require("../config");
const jwt = require("jsonwebtoken");

exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  // console.log()

  if (!token)
    return res.status(401).send("Access Denied / Unauthorized request");

  try {
    token = token.split(" ")[1]; // Remove Bearer from string
      
    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");

    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET); // config.TOKEN_SECRET => 'secretKey'
        
    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    req.user = verifiedUser; // user_id & user_type_id
    req.user
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
exports.IsUser = async (req, res, next) => {
   const isUser = req.user.user_type_id
  if (isUser === 0) {
    return next();
  }
  return res.status(401).send("Unauthorized!");
};
exports.IsAdmin = async (req, res, next) => {
  if (req.user.user_type_id === 1) {
   return  next();
  }
  return res.status(401).send("Unauthorized!");
};
