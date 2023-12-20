import { Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './user.joi.validation';

// createUser
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const joiParseData = userValidationSchema.validate(userData);
    const result = await userService.createUser(joiParseData.value);
    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// getAllUser

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.status(200).json({
      status: 'success',
      message: 'Users retrived successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// getSingalUser
const getSingalUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getSingalUser(userId);
    res.status(200).json({
      status: 'success',
      message: 'Singal User retrived successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// updateUser
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userService.updateUser(userId, userData);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

//userOrders
const userOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userService.userOrders(userId, userData);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// getAllOrdersForUser
const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getAllOrdersForUser(userId);
    res.status(200).json({
      status: 'success',
      message: 'orders retrived successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// calculateTotalPrice
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.calculateTotalPrice(userId);
    res.status(200).json({
      status: 'success',
      message: 'calculated price retrived  successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

// deleteUser
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId);
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingalUser,
  updateUser,
  deleteUser,
  userOrders,
  getAllOrdersForUser,
  calculateTotalPrice,
};
