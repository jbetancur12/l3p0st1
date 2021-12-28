import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  role: {
    type: String,
    enum: ['admin', 'editor', 'user'],
    default: 'user',
  },

  created: {
    type: Date,
    default: Date.now,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  updated: Date,
});


export default mongoose.model('Role', RoleSchema);
