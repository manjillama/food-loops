import { Document } from 'mongoose';

export interface ICustomerType {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: number;
  photo?: string;
}

export default interface ICustomer extends Document, ICustomerType {}
