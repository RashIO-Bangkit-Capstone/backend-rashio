const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { User } = require('../../../db/models');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class UsersService {
  constructor() {
    this.User = User;
  }

  async checkEmailAvailable(email) {
    const user = await this.User.findOne({ where: { email } });

    if (user) {
      throw new InvariantError('email already used');
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

  verifyUserAccess(id, credentialId) {
    if (id !== credentialId) {
      throw new AuthorizationError(
        'You are not authorized to access this resource'
      );
    }
  }

  async getUserById(id) {
    const user = await this.User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async editUserById(id, { name, email }) {
    const result = await this.User.update({ name, email }, { where: { id } });

    if (!result) {
      throw new NotFoundError('User not found');
    }
  }

  async editUserPasswordById(id, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.User.update(
      { password: hashedPassword },
      { where: { id } }
    );

    if (!result) {
      throw new NotFoundError('User not found');
    }
  }
}

module.exports = UsersService;
