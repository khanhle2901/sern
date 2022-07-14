'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'le',
        lastName: 'khanh',
        email: 'stupid2901@gmail.com',
        passWord: '733773',
        address: 'Dn',
        gender: 1,
        typeRole: 'ROLE',
        keyRole: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {})
  },
}
