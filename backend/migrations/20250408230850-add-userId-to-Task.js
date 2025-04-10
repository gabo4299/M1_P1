'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // nombre de la tabla (¡cuidado con mayúsculas/minúsculas!)
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'userId');
  }
};
