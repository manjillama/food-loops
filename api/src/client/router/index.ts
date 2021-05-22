import { Application } from 'express';
import checkoutRouter from './checkoutRoutes';

export default function (app: Application): void {
  app.use('/api/checkout', checkoutRouter);
}
