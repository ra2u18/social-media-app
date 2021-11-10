const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

// Relative imports
const User = require('../../models/user.model');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }, context, info) {
      // Validate user input
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Login Input Error', { errors });
      }

      // Validate user existance
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not Found!';
        throw new UserInputError('Login Error', { errors });
      }

      const matchPass = bcrypt.compare(password, user.password);
      if (!matchPass) {
        errors.general = 'Wrong password or username!';
        throw new UserInputError('Login Credentials Error', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
      // Validate user input
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Register Error', { errors });
      }

      // Validate Uniqueness of user
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is already taken!', {
          errors: { username: 'Username is already taken!' },
        });
      }

      // Hash user password
      password = await bcrypt.hash(password, 12);

      // Create the user model
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const userDoc = await newUser.save();

      // Create token for user authentication
      const token = generateToken(userDoc);

      return {
        ...userDoc._doc,
        id: userDoc._id,
        token,
      };
    },
  },
};
