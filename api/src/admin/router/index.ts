import { Application } from 'express';
import userRouter from './userRoutes';
import menuItemRouter from './menuItemRoutes';

export default function (app: Application): void {
  app.use('/api/admin/users', userRouter);
  app.use('/api/admin/menu', menuItemRouter);
}
