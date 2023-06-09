/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('Articles', 'author', {
      type: Sequelize.STRING,
    });

    await queryInterface.sequelize.query(`UPDATE articles SET author = 'John Biden' WHERE author IS NULL;`);
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('articles', 'author');
  }
};
