'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    abbreviation: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    modelName: 'Category',
    tableName: 'category'
  });
  Category.associate = function(models) {
    Category.hasMany(models.Product)
  };

  Category.findCategoryByAbbreviation = function(abbreviation) {
    return Category.findOne({
      where: { abbreviation, active: true }
    });
  }

  Category.findByQuery = function(where) {
    return Category.findAll({ where });
  }

  Category.findCategoryById = function(id) {
    return Category.findOne({
      where: { id, active: true }
    });
  }

  Category.deleteCategoryById = function(id) {
    return Category.destroy({ where: { id } });
  }

  Category.softDeleteCategoryById = function(id) {
    return Category.update({ active: false }, { where: { id } });
  }

  Category.deleteCategoryByQuery = function(where) {
    return Category.destroy({ where });
  }

  Category.softDeleteCategoryByQuery = function(where) {
    return Category.update({ active: false }, { where });
  }

  Category.updateCategoryById = function(id, payload) {
    return Category.update(payload, {
      where: { id, active: true }
    });
  }

  Category.updateCategoryByAbbreviation = function(abbreviation, payload) {
    return Category.update(payload, {
      where: { abbreviation, active: true }
    });
  }
  return Category;
};