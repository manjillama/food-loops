import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import Staff from '../../shared/models/staffModel';
import factoryService from '../../shared/services/factoryService';
import { StaffRequest } from '../interfaces/StaffRequest';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const [users, total, size] = await factoryService.getAll(Staff, req.query as any);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      total,
      size,
      users
    }
  });
};

const updateUser = async (req: StaffRequest, res: Response): Promise<void> => {
  const userData = _.pick(req.body, ['name', 'email', 'phoneNumber']);
  const user = await factoryService.updateOne(Staff, null, userData as any, 'User', req.user);

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      user
    }
  });
};

export default { getAllUsers, updateUser };
