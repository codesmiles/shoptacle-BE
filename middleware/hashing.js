const bcrypt = require("bcrypt");

// hassh the password as a middleware
const hashPasswordMiddleware = async (req, res, next) => {
  const { password } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);    
    password = await bcrypt.hash(password, salt);

    
  }
  next();
};

module.exports = hashPasswordMiddleware;