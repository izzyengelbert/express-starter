import { Op } from 'sequelize';
import NotFoundError from '../../errors/common/NotFoundError';

const ENTITY = 'Category';

export default class CategoryService {
  constructor(models) {
    this._Category = models[ENTITY];
  }

  getAllCategories() {
    return this._Category.findAll({ where: { active: true } });
  }

  getCategoriesByQuery(query) {
    const {
      abbreviation = null
    } = query || {};
    if (abbreviation) {
      return this._Category.findCategoryByAbbreviation(abbreviation);
    }
    return this._getByQuery(query);
  }

  _getByQuery(query) {
    const { description = null, active = null } = query || {};
    const where = { active: true };
    if (description) {
      where.description = {
        [Op.like]: `%${description}%`
      };
    }
    if (active !== null) {
      where.active = active;
    }
    return this._Category.findByQuery(where);
  }

  getCategoryById(id) {
    return this._findCategoryById(id);
  }

  deleteCategoryById(id) {
    return this._Category.softDeleteCategoryById(id);
  }

  deleteCategoryByQuery(query) {
    const where = { abbreviation: query.abbreviation };
    return this._Category.softDeleteCategoryByQuery(where);
  }

  updateCategoryById(id, payload) {
    return this._Category.updateCategoryById(id, payload);
  }

  updateCategoryByAbbreviation(abbreviation, payload) {
    return this._Category.updateCategoryByAbbreviation(abbreviation, payload);
  }

  createCategory(payload) {
    const category = new this._Category(payload);
    return category.save();
  }

  async _findCategoryById(id) {
    const Category = await this._Category.findCategoryById(id);
    if (!Category) {
      throw new NotFoundError(ENTITY);
    }
    return Category;
  }
}
