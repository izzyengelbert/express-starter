'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', [
      {
        abbreviation: 'BDM',
        description: 'badminton',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'SPK',
        description: 'sepak bola',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'BKT',
        description: 'Basket',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'ACC',
        description: 'Accesories',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'ALM',
        description: 'Alat musik',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'BLD',
        description: 'Bela Diri',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'OTH',
        description: 'Others',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'PGP',
        description: 'Ping pong',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'FTL',
        description: 'Futsal',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'RNG',
        description: 'Renang',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'SPF',
        description: 'Sepak futsal',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'TNS',
        description: 'Tennis',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'VLY',
        description: 'Volley',
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      },
      {
        abbreviation: 'ABAL',
        description: 'test abal',
        active: false,
        created_at: new Date(),
        updated_at: new Date(),
        count: 0
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {});
  }
};
