import mongoose from 'mongoose';

const Schema = mongoose.Schema;



const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'El Nombre es requerido',
  },
  format: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  providers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
    },
  ],

  updated: Date,
});

CategorySchema.pre('deleteMany', function (next) {
  this.model('Assignment').deleteOne({ person: person._id }, next);
});

export default mongoose.model('Category', CategorySchema);
