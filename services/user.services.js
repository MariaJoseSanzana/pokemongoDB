const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();


class UserService {
  async registerUser(userData) {
    const { username, password } = userData;

    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error('El usuario ya existe');
    }

    const user = new User({ username, password });

    await user.save();
    return user;
  }

  async loginUser(userData) {
    const { username, password } = userData;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return { user, token };
  }

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = UserService;