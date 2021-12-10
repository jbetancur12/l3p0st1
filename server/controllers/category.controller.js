import Category from '../models/category.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const category = new Category(req.body);
  console.log(req.body);
  try {
    await category.save();
    return res.status(200).json({
      message: 'Successfully created!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let categories = await Category.find().select('name products updated created');
    res.json(categories);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const categoryByID = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    if (!category)
      return res.status('400').json({
        error: 'category not found',
      });
    req.category = category;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve category',
    });
  }
};

const read = async (req, res) => {
  try {
    const category_id = req.category
    const category = await Category.findById(category_id).populate('products');
    res.json(category);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve category',
    });
  }
}

export default { create, categoryByID, list, read };
