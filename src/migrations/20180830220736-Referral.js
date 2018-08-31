'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Referrals', 'points', Sequelize.INTEGER)
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Referrals', 'points')
  }
};
