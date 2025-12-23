const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "autoparts_secure_key");
    
    req.user = decoded;
    next();

  } catch (error) {
    res.sendStatus(401);
  }
};