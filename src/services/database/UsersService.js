const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { User } = require('../../../db/models');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
  constructor() {
    this.User = User;
  }

  async checkEmailAvailable(email) {
    const user = await this.User.findOne({ where: { email } });

    if (user) {
      throw new Error('Email already exists');
    }
  }

  async addUser({ name, email, password }) {
    const id = `user-${nanoid()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.User.create({
      id,
      name,
      email,
      password: hashedPassword,
    });

    if (!result) {
      throw new InvariantError('Failed to add user');
    }

    return id;
  }

  async verifyUserCredential({ email, password }) {
    const user = await this.User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundError('email or password is incorrect');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new NotFoundError('email or password is incorrect');
    }

    return user;
  }
}

module.exports = UsersService;
