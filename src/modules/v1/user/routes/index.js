import express from 'express';
import getTransactions from '../controllers/transaction-management/get-transactions';
import getTransactionDetails from '../controllers/transaction-management/get-transaction-details';

const userRouter = express.Router();

/**
 * user routes
 * @description user routes
 */

// transaction routes
userRouter.get('/get-tx-details', getTransactions.get);
userRouter.get('/get-transaction', getTransactionDetails.get);

module.exports = userRouter;