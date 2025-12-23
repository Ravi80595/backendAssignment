const User = require('../modules/users/user.model');

module.exports = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.sourceEmail });
  if (!user) return res.sendStatus(403);
  next();
};
