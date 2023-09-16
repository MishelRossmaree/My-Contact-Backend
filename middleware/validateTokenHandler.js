const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.header('Authorization') || req.header('authorization');
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
        throw new Error('User is not authorized');
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.sendStatus(401);
    throw new Error('User is not authorized');
  }
});

module.exports = validateToken;
