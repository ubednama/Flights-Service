'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Airports', {
      type: 'FOREIGN KEY',
      fields: ['CityId'],
      name: 'city_airport_fkey_constraint_name',
      references: {
        table: 'Cities',
        field: 'id',
      },
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeConstraint('Airports', 'city_airport_fkey_constraint_name');
  }
};


/**
 * Query to check if constraint has been applied
 * SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = 'Airports' AND CONSTRAINT_SCHEMA = "Flights"
 */