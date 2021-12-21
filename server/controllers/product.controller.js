import Product from '../models/product.model';
import Provider from '../models/provider.model';
import Category from '../models/category.model';
import errorHandler from '../helpers/dbErrorHandler';
import { countBy } from 'lodash';

const list = async (req, res) => {
  try {
    let products = await Product.find({})
      .populate('provider', 'name')
      .populate('category', 'name');
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const price = async (req, res) => {
  try {
    if (req.category[0]._id && req.provider[0]._id) {
      const product = await Product.find({
        $and: [
          {
            provider: req.provider[0]._id,
          },
          {
            category: req.category[0]._id,
          },
          // {
          //   length: {
          //     $gte: req.params.length,
          //   },
          // },
        ],
      }).select('days price length');

      // const product = await Product.find({
      //   'category': req.category[0]._id,
      // })

      // .where("category._id").equals(req.category._id)
      // .where("provider._id").equals(req.provider._id)
      // .where("length").gte(parseFloat(req.params.length))

      res.json(product);
    }
  } catch (error) {
    return res.status('400').json({
      error:
        'Could not retrieve product with provider: ' +
        req.provider[0]._id +
        ' and ' +
        'category: ' +
        req.category[0]._id +
        '',
    });
  }
};

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();

    const category_id = await Category.findById(req.body.category);
    category_id.products.push(product);
    await category_id.save();

    const provider_id = await Provider.findById(req.body.provider);
    provider_id.products.push(product);
    await provider_id.save();

    return res.status(200).json({
      message: 'Successfully created!',
      payload: product,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = async (req, res) => {
  try {
    const product_id = req.product;
    const product = await Product.findById(product_id).populate('provider');
    res.json(product);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
};

const update = async (req, res) => {
  try {
    Product.findByIdAndUpdate(
      req.product._id,
      {
        $set: req.body,
      },
      { new: true },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res
            .status(200)
            .json({ message: 'Product updated successfully !', payload: data });
        }
      },
    );
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
};

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

const remove = (req, res, next) => {
  Category.findByIdAndRemove(req.product._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

export default { create, read, productByID, list, price, update, remove };
