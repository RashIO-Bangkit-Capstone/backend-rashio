const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { User } = require('../../../db/models');

class UsersService {
  constructor() {
    this.User = User;
  }

  async checkEmailExists(email) {
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
}

module.exports = UsersService;
