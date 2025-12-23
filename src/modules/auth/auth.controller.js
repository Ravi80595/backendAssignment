const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "autoparts_secure_key",
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    next(error);
  }
};