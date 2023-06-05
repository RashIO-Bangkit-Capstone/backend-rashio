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
      throw new InvariantError('Email already used');
    }
  }

  async checkPhoneNumberAvailable(phoneNumber) {
    const user = await this.User.findOne({ where: { phoneNumber } });

    if (user) {
      throw new InvariantError('Phone number already used');
    }
  }

  async addUser({ name, email, password, phoneNumber }) {
    const id = `user-${nanoid()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.User.create({
      id,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    if (!result) {
      throw new InvariantError('Failed to add user');
    }

    return id;
  }

  async verifyUserCredential({ email, password }) {
    const user = await this.User.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundError('Email or password is incorrect');
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

  async editUserById(id, { name, email, phoneNumber }) {
    const result = await this.User.update(
      { name, email, phoneNumber },
      { where: { id } }
    );

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
