import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'El Nombre es requerido',
  },
  price: {
    type: String,
    required: true
  },
  days: {
    type: [String],
    required: true
  },
  length: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider"
  },
  orders:
    [{
      type: Schema.Types.ObjectId,
      ref: "Order"
    }],
  created: {
    type: Date,
    default: Date.now,
  },

  updated: Date,
});


export default mongoose.model('Product', ProductSchema);