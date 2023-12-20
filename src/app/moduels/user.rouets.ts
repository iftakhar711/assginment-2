import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

// createUser
router.post('/', userController.createUser);
// getAllUser
router.get('/', userController.getAllUser);
// getSingalUser
router.get('/:userId', userController.getSingalUser);
// updateUser
router.put('/:userId', userController.updateUser);
// userOrders
router.put('/:userId/orders', userController.userOrders);
// getAllOrdersForUser
router.get('/:userId/orders', userController.getAllOrdersForUser);
// calculateTotalPrice
router.get('/:userId/orders/total-price', userController.calculateTotalPrice);
// deleteUser
router.delete('/:userId', userController.deleteUser);

export const userRouets = router;
