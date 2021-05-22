import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import _ from 'lodash';
import AppError from '../../shared/utils/appError';
import MenuItem from '../../shared/models/menuItemModel';
import { validateSchema } from '../../shared/utils/validator';

const oderedItemSchema = Joi.object()
  .keys({
    menuItem: Joi.string().required(),
    quantity: Joi.number().required()
  })
  .unknown(true);

const checkoutBodySchema = Joi.object({
  menuItems: Joi.array().items(oderedItemSchema).required()
}).unknown(true);

export const validateCheckout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { menuItems } = req.body;
  const orderedItems: { menuItem: string; quantity: number; price: number }[] = [];

  validateSchema(checkoutBodySchema, req.body);

  for (const item of menuItems) {
    const orderedItem = await MenuItem.findById(item.menuItem);
    if (orderedItem) orderedItems.push({ menuItem: item.menuItem, quantity: item.quantity, price: orderedItem.price });
  }

  if (orderedItems.length <= 0) throw new AppError('Order menu items empty or not valid', StatusCodes.BAD_REQUEST);

  req.body.orderedItems = orderedItems;

  next();
};
