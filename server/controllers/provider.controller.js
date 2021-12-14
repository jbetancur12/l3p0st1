import Provider from '../models/provider.model';
import Category from '../models/category.model';
import errorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
  const provider = new Provider(req.body);
  try {
    await provider.save();
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
    let providers = await Provider.find()
      .select('name email phone products updated created')
      .populate('categories', 'name');
    res.json(providers);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const providerByID = async (req, res, next, id) => {
  try {
    let provider = await Provider.findById(id);
    if (!provider)
      return res.status('400').json({
        error: 'provider not found',
      });
    req.provider = provider;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve provider',
    });
  }
};

const providerName = async (req, res, next, name) => {
  try {
    let provider = await Provider.find({ name: name });
    if (!provider)
      return res.status('400').json({
        error: 'provider not found',
      });
    req.provider = provider;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve provider',
    });
  }
};

const read = async (req, res) => {
  try {
    const provider_id = req.provider;
    const provider = await Provider.findById(provider_id).populate('products');
    res.json(provider);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve provider',
    });
  }
};

const providersByCategory = async (req, res) => {
  try {
    let provider = await Provider.findById(id);

    if (!provider)
      return res.status('400').json({
        error: 'provider not found',
      });
    // req.product = product;
    // next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
};

const update = async (req, res) => {
  try {
    const _provider = await Provider.findByIdAndUpdate(req.provider._id, {
      $set: req.body,
    });

    if (req.body.categories) {
      await Category.updateMany(
        { _id: _provider.categories },
        { $push: { providers: _provider._id } },
      );
    }

    return res.status(200).json({
      message: 'Provider Successfully Updated!',
    });
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve category',
    });
  }
};

export default {
  create,
  list,
  providerByID,
  read,
  providerName,
  providersByCategory,
  update,
};
