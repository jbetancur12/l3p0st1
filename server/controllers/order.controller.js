import Order from '../models/order.model';
import User from '../models/user.model';
import Product from '../models/product.model';
import errorHandler from '../helpers/dbErrorHandler';


const list = async (req, res) => {
  try {
    let orders = await Order.find();
    res.json(orders);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });

  }
};

const create = async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();

    const user_id = await User.findById(req.body.user)
    user_id.orders.push(order)
    await user_id.save()

    const product_id = await Product.findById(req.body.product)
    console.log(product_id);
    product_id.orders.push(order)
    await product_id.save()

    return res.status(200).json({
      message: 'Order Successfully created!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { list, create }