import Provider from '../models/provider.model';
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
    let providers = await Provider.find().select('name email phone products updated created');
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

const read = async (req, res) => {
  try {
    const provider_id = req.provider
    const provider = await Provider.findById(provider_id).populate('products');
    res.json(provider);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve provider',
    });
  }
}


export default { create, list, providerByID, read }