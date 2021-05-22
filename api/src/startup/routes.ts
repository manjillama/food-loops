import express, { Application, Request, Response, NextFunction } from 'express';
import AppError from '../shared/utils/appError';
import adminRouter from '../admin/router';
import clientRouter from '../client/router';

export default function (app: Application): void {
  app.use(express.json());

  adminRouter(app);
  clientRouter(app);

  // If requested route is not matched with any
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });
}
