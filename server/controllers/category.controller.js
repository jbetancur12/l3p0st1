import Category from '../models/category.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    // const provider_id = await Provider.findById(req.body.provider);
    // provider_id.categories.push(category);
    // await provider_id.save();
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
    let categories = await Category.find()
      .select('name products updated created')
      .populate('providers', 'name');
    res.json(categories);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const categoryByID = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id).populate('providers');
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

const categoryName = async (req, res, next, name) => {
  try {
    let category = await Category.find({ name: name });
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
    const category_id = req.category;
    const category = await Category.findById(category_id).populate(
      'products providers',
    );
    res.json(category);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve category',
    });
  }
};
const update = async (req, res) => {
  try {
    Category.findByIdAndUpdate(
      req.category._id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.status(200).json({ message: 'Category updated successfully !' });
        }
      },
    );
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve category',
    });
  }
};

export default { create, categoryByID, list, read, categoryName, update };
