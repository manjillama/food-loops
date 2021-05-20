import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../shared/utils/appError';
import imageHandler from '../../shared/utils/imageHandler';
import { StaffRequest } from '../interfaces/StaffRequest';
import menuItemService from '../services/menuItemService';

const addMenuItem = async (req: Request, res: Response): Promise<void> => {
  const menuItem = await menuItemService.addMenuItem(req.body);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      menuItem
    }
  });
};

const updateMenuItem = async (req: StaffRequest, res: Response): Promise<void> => {
  const menuItem = await menuItemService.updateMenuItem(req.menuItem, req.body);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      menuItem
    }
  });
};

const addMenuItemImage = async (req: StaffRequest, res: Response): Promise<void> => {
  const { menuItem } = req;

  const photo = await imageHandler.uploadImage(req.file.buffer, `menu-${Date.now()}.jpg`);

  menuItem.photo = photo;
  await menuItem.save();

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    data: {
      photo
    }
  });
};

const deleteMenuItemImage = async (req: StaffRequest, res: Response): Promise<void> => {
  const { menuItem } = req;

  if (!menuItem.photo) throw new AppError('No menu item photo to remove', StatusCodes.BAD_REQUEST);

  const imageName = menuItem.photo.match(/[\w-]+\.jpg/g)[0];
  imageHandler.deleteImage(imageName);

  menuItem.photo = undefined;
  await menuItem.save();

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success'
  });
};

export default {
  addMenuItem,
  updateMenuItem,
  addMenuItemImage,
  deleteMenuItemImage
};
