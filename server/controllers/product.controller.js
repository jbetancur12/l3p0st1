import Product from '../models/product.model';
import errorHandler from '../helpers/dbErrorHandler';

const list = async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();

    const category_id = req.category
    category_id.products.push(product)
    await category_id.save()

    const provider_id = req.provider
    provider_id.products.push(product)
    await provider_id.save()

    return res.status(200).json({
      message: 'Successfully created!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = async (req, res) => {
  try {
    const product_id = req.product
    const product = await Product.findById(product_id);
    res.json(product);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
}

const productByID = async (req, res, next, id) => {
  try {
    let product = await Product.findById(id);

    if (!product)
      return res.status('400').json({
        error: 'product not found',
      });
    req.product = product;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
};

export default { create, read, productByID, list }