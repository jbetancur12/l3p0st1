import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  status: {
    type: Boolean,
    deafult: false
  },
  total: {
    type: String
  },
  content: {
    type: String
  },
  publish_date: {
    type: Date
  },
  reference: {
    type: String
  },
  payment_method: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  },
  ordered: {
    type: Boolean,
    default: false
  },
  temp_email: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
})

export default mongoose.model('Order', OrderSchema);