import ProductNotFoundError from '../../errors/product/ProductNotFoundError';
import NotFoundError from '../../errors/common/NotFoundError';

export default class ProductService {
  constructor(models) {
    this._Category = models.Category;
    this._Product = models.Product;
  }

  getAllProducts(query) {
    const { active } = query;
    const options = {
      attributes: { exclude: 'CategoryId' }
    };
    const order = this._setOrder(query);
    if (order.length > 0) {
      options.order = order;
    }
    if (active) {
      options.where = { active };
    }
    return this._Product.findAll(options);
  }

  // eslint-disable-next-line class-methods-use-this
  _setOrder(query) {
    const { createdAt, updatedAt } = query;
    const order = [];
    if (createdAt) {
      order.push(['createdAt', createdAt]);
    }
    if (updatedAt) {
      order.push(['updatedAt', updatedAt]);
    }
    return order;
  }

  getProductById(id) {
    return this._findProductById(id);
  }

  getProductByDescription(description) {
    return this._findProductByDescription(description);
  }

  deleteProductById(id) {
    return this._Product.softDeleteProductById(id);
  }

  updateProductById(id, payload) {
    return this._Product.updateProductById(id, payload);
  }

  async createProduct(payload) {
    const newPayload = payload;
    const { categoryAbbreviation } = newPayload;
    const category = await this._findCategory(categoryAbbreviation);
    newPayload.categoryId = category.id;
    const categoryIdString = category.id.toString().padStart(3, '0');
    newPayload.productId = `${category.abbreviation}${categoryIdString}`;
    const product = new this._Product(newPayload);
    const categoryCount = category.count.toString().padStart(4, '0');
    product.productId = `${product.productId}${categoryCount}`;
    const result = await product.save();
    await category.increment('count', { by: 1 });
    return { result, category };
  }

  async _findCategory(categoryAbbreviation) {
    const category = await this._Category
      .findCategoryByAbbreviation(categoryAbbreviation);
    if (!category) {
      throw new NotFoundError('Category');
    }
    return category;
  }

  async _findProductByDescription(description) {
    const Product = await this._Product.findProductByDescription(description);
    if (!Product) {
      throw new ProductNotFoundError();
    }
    return Product;
  }

  async _findProductById(id) {
    const Product = await this._Product.findProductById(id);
    if (!Product) {
      throw new ProductNotFoundError();
    }
    return Product;
  }
}
