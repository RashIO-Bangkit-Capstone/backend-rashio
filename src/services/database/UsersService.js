const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { User } = require('../../../db/models');

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
    const hasshedPassword = await bcrypt.hash(password, 10);

    const result = await this.User.create({
      id,
      name,
      email,
      password: hasshedPassword,
    });

    if (!result) {
      throw new Error('Error creating user');
    }

    return id;
  }

  async verifyUserCredential({ email, password }) {
    const user = await this.User.findOne({ where: { email } });

    if (!user) {
      throw new Error('email or password is incorrect');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('email or password is incorrect');
    }

    return user;
  }
}

module.exports = UsersService;
