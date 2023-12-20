import config from '../config';
import { Iuser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

// createUser
const createUser = async (userData: Iuser): Promise<Iuser> => {
  const result = await User.create(userData);
  return result;
};

// getAllUser
const getAllUser = async (): Promise<Iuser[]> => {
  const result = await User.find().select(
    'username fullName age email address',
  );
  return result;
};

// getSingalUser
const getSingalUser = async (id: string): Promise<Iuser | null> => {
  const user = new User({ userId: id });
  if ((await user.isUserExists(id)) === null) {
    throw new Error('User not found');
  }

  const result = await User.findOne({ userId: id });
  return result;
};

// updateUser
const updateUser = async (
  id: string,
  userData: Iuser,
): Promise<Iuser | null> => {
  const user = new User({ userId: id });
  if ((await user.isUserExists(id)) === null) {
    throw new Error('User not found');
  }
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const result = await User.findOneAndUpdate(
    { userId: id },
    { $set: userData },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// userOrders
const userOrders = async (
  id: string,
  userData: Iuser,
): Promise<Iuser | null> => {
  const user = new User({ userId: id });
  if ((await user.isUserExists(id)) === null) {
    throw new Error('User not found');
  }
  // push data to orders field in user model
  const result = await User.findOneAndUpdate(
    { userId: id },
    {
      $push: { orders: userData.orders },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

// getAllOrdersForUser
const getAllOrdersForUser = async (userId: string): Promise<Iuser | null> => {
  const user = new User({ userId });
  if ((await user.isUserExists(userId)) === null) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }).select('orders');
  return result;
};

// calculateTotalPrice
const calculateTotalPrice = async (userId: string): Promise<number> => {
  const user = new User({ userId });
  if ((await user.isUserExists(userId)) === null) {
    throw new Error('User not found');
  }
  const result = await User.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
  ]);

  return result[0].totalPrice;
};

// deleteUser
const deleteUser = async (id: string) => {
  const user = new User({ userId: id });
  if ((await user.isUserExists(id)) === null) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndDelete({ userId: id });
  return result;
};

export const userService = {
  createUser,
  getAllUser,
  getSingalUser,
  updateUser,
  deleteUser,
  userOrders,
  getAllOrdersForUser,
  calculateTotalPrice,
};
