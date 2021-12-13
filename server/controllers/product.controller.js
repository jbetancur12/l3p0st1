import Product from '../models/product.model';
import Provider from '../models/provider.model';
import Category from '../models/category.model';
import errorHandler from '../helpers/dbErrorHandler';
import { countBy } from 'lodash';

const list = async (req, res) => {
  try {
    let products = await Product.find().populate("provider", "name").populate("category", "name");
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });

  }
};

const price = async (req, res) => {

  try {
    const product = await Product.find(
      {
        $and: [
          {
            "category._id": req.category._id
          },
          {
            "provider._id": req.provider._id
          },
          {
            length:
            {
              $gte: req.params.length
            }
          }]
      }
    )

    // .where("category._id").equals(req.category._id)
    // .where("provider._id").equals(req.provider._id)
    // .where("length").gte(parseFloat(req.params.length))
    console.log(product);

    res.json(product);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
}

const create = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();

    const category_id = await Category.findById(req.body.category)
    category_id.products.push(product)
    await category_id.save()

    const provider_id = await Provider.findById(req.body.provider)
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
    const product = await Product.findById(product_id).populate("provider");
    res.json(product);
  } catch (error) {
    return res.status('400').json({
      error: 'Could not retrieve product',
    });
  }
}

const update = async (req, res) => {
  try {
    Product.findByIdAndUpdate(req.product._id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.status(200).json({ message: "Product updated successfully !" })

      }
    })

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



export default { create, read, productByID, list, price, update }