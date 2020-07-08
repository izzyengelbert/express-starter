'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    productId: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(15)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    cost: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    normalPrice: {
      allowNull: false,
      type: DataTypes.FLOAT,
      field: 'normal_price'
    },
    bottomPrice: {
      allowNull: true,
      type: DataTypes.FLOAT,
      field: 'bottom_price'
    },
    topPrice: {
      allowNull: true,
      type: DataTypes.FLOAT,
      field: 'top_price'
    },
    uom: { //Unit of measurement
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'product'
  });
  Product.associate = function(models) {
    Product.belongsTo(models.Category)
  };

  Product.findProductByCategoryId = function(categoryId) {
    return Product.findAll({
      where: { categoryId, active: true },
      attributes: { exclude: 'CategoryId' }
    });
  }

  Product.findProductByCategoryAbbreviation = function(abbreviation) {
    return Product.findAll({
      where: {
        productId: {
          [Sequelize.Op.like]: `${abbreviation}%`
        },
        active: true
      },
      attributes: { exclude: 'CategoryId' }
    });
  }

  Product.findProductById = function(id) {
    return Product.findOne({
      where: { id, active: true },
      attributes: { exclude: 'CategoryId' }
    });
  }

  Product.deleteProductById = function(id) {
    return Product.destroy({ where: { id } });
  }

  Product.softDeleteProductById = function(id) {
    return Product.update({ active: false }, { where: { id } });
  }

  Product.updateProductById = function(id, payload) {
    return Product.update(payload, {
      where: { id, active: true }
    });
  }

  Product.findProductByDescription = function(description) {
    return Product.findOne({
      where: { description, active: true },
      attributes: { exclude: 'CategoryId' }
    });
  }
  return Product;
};