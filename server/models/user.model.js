import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'El Nombre es requerido',
  },
  lname: {
    type: String,
    trim: true,
    required: 'El Apellido es requerido',
  },
  doc_id: {
    type: String,
    unique: 'Cedula ya existe',
    trim: true,
    required: 'Número de cedula es requerido',
  },
  phone: {
    type: String,
    trim: true,
    required: 'Número de celular es requerido',
  },
  city: {
    type: String,
    trim: true,
    required: 'La ciudad es requerida',
  },
  address: {
    type: String,
    trim: true,
    required: 'La dirección es requerida',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email es requerido',
  },
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
};

UserSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

export default mongoose.model('User', UserSchema);
