import mongoose, { HookNextFunction } from 'mongoose';
import crypto from 'crypto';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { keys } from '../../config';
import ICustomer from '../interfaces/ICustomer';

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      // eslint-disable-next-line no-useless-escape
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    countryCode: {
      type: String,
      required: [true, 'Please provide a country code'],
      default: '+977'
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: [true, 'User with the phone number already exists'],
      minlength: [10, 'Please enter 10 digit number'],
      maxlength: [10, 'Please enter 10 digit number']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    enabled: {
      type: Boolean,
      default: true,
      select: false
    },
    photo: {
      type: String,
      default: 'https://yatrihub.s3.amazonaws.com/static/avatar.png'
    }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

customerSchema.pre<ICustomer>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

customerSchema.pre<ICustomer>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // Setting in database can be bit slower than issuing a jwt
  // Hence passwordChangedAt timestamp is set sometime a bit after then jwt is issued
  // Which will prevent access to the user thinking a password has been updated
  // Hence - 5000
  this.passwordChangedAt = Date.now() - 5000;
  next();
});

customerSchema.methods.validatePassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if user changed password after the token was issued
customerSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    // converting millisecond into seconds
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }

  // false means not changed
  return false;
};

customerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Hashing reset token, never store plain reset token to the database
  // same reason we don't save plain password to database
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // password expiration time 10 mins
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // send plain token to user and compare it with encrypted token form our DB
  return resetToken;
};

customerSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES_IN
  });
};

export const _customerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string().required()
}).unknown(true);

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
