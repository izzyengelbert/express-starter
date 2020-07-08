'use strict';
const bcrypt = require('bcrypt');

const hashPassword = (password, saltRounds = 10) => bcrypt.hash(password, saltRounds);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dummyPassword = await hashPassword('password')
    return queryInterface.bulkInsert('user_account', [
      {
        username: 'user1',
        password: dummyPassword,
        last_module: 'Invoice',
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'user2',
        password: dummyPassword,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_account', null, {});
  }
};
