import { Document } from 'mongoose';

export interface ICustomerType {
  name?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  password?: string;
  createdAt?: Date;
  passwordChangedAt?: number;
  passwordResetToken?: string;
  passwordResetExpires?: number | Date;
  enabled?: boolean;
  photo?: string;
  validatePassword(s: string, hash: string): Promise<boolean>;
  changedPasswordAfter(jwtIssuedTime: number): boolean;
  generateAuthToken(): string;
  createPasswordResetToken(): string;
}

export default interface ICustomer extends Document, ICustomerType {}
