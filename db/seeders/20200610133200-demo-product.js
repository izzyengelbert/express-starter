'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    const categories = await queryInterface.rawSelect('category', { plain: false }, ['id']);
    // categories = await queryInterface.rawSelect('category', { where: { id: categories }}, ['abbreviation']);
    let stringifiedInteger = categories[0].id.toString();
    // console.log(categories, stringifiedInteger.padStart(3, '0'));
    const result = await Sequelize.query("SELECT nextVal('product_id_seq')", { type: Sequelize.QueryTypes.SELECT })
    // console.log(result)
    
    return queryInterface.bulkInsert('product', [
      // {
      //   id: customIdOne,
      //   description: 'Racket',
      //   category: 'sport',
      //   cost: 199.11,
      //   stock: 100000,
      //   normal_price: 20000,
      //   bottom_price: 10000,
      //   uom: 'Pc',
      //   active: false,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   description: 'Basketball',
      //   category: 'sport',
      //   cost: 2000.51,
      //   stock: 10000,
      //   normal_price: 30000,
      //   top_price: 40000,
      //   uom: 'Pc',
      //   active: true,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   description: 'shoes',
      //   category: 'fashion',
      //   cost: 100,
      //   stock: 100,
      //   normal_price: 2000,
      //   bottom_price: 1000,
      //   top_price: 3000,
      //   uom: 'Pc',
      //   active: true,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   description: 'steak',
      //   category: 'food',
      //   cost: 4000,
      //   stock: 50,
      //   normal_price: 2000.500,
      //   bottom_price: 2000.100,
      //   top_price: 20001,
      //   uom: 'Pc',
      //   active: true,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product', null, {});
  }
};
