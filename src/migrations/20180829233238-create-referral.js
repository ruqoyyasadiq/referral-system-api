'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Referrals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        validate: {
          isEmail: true
        },
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      referrerId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id',
          as: 'roleIdreferrerId',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Referrals')
};