import mongoose from 'mongoose';
import ICustomerOrder from '../interfaces/ICustomerOrder';

export const orderedItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Types.ObjectId,
    ref: 'MenuItem',
    required: [true, 'Please specify a menu item id']
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide food price (NPR)']
  },
  price: {
    type: Number,
    required: [true, 'Please provide food price (NPR)']
  },
  remarks: String
});

const customerOrderModelSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
    select: false
  },
  remarks: String,
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Please specify a customer id']
  },
  orderedItems: [orderedItemSchema]
});

const CustomerOrder = mongoose.model<ICustomerOrder>('CustomerOrder', customerOrderModelSchema);

export default CustomerOrder;
