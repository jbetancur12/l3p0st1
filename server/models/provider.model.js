import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'El Nombre es requerido',
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model('Provider', ProviderSchema);
