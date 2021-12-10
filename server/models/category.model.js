import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'El Nombre es requerido',
  },
  format: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now,
  },
  products:
    [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],

  updated: Date,
});


export default mongoose.model('Category', CategorySchema);
