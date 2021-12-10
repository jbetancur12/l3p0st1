import Product from '../models/product.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    const id = req.category
    console.log(id);
    id.products.push(product)
    await id.save()
    return res.status(200).json({
      message: 'Successfully created!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create }