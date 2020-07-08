'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING(15)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
      cost: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      normalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
        field: 'normal_price'
      },
      bottomPrice: {
        allowNull: true,
        type: Sequelize.FLOAT,
        field: 'bottom_price'
      },
      topPrice: {
        allowNull: true,
        type: Sequelize.FLOAT,
        field: 'top_price'
      },
      uom: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product');
  }
};