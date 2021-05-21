import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Staff from '../../shared/models/staffModel';
import factoryService from '../../shared/services/factoryService';

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

export default { getAllUsers };
