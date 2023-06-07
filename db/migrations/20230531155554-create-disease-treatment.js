/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiseaseTreatments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      diseaseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Diseases',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      treatment: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('DiseaseTreatments');
  },
};
