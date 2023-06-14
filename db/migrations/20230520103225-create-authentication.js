/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Authentications', {
      refreshToken: {
        type: Sequelize.STRING(500),
        allowNull: false,
        primaryKey: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Authentications');
  },
};
