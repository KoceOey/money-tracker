const express = require('express');
const router = express.Router();

const transactionController = require('./controllers/transactionController');
const accountController = require('./controllers/accountController');

// Transaction routes
router.post('/transactions', transactionController.addTransaction);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.get('/transactions', transactionController.getAllTransactions);

// Account routes
router.post('/accounts', accountController.addAccount);
router.put('/accounts/:id', accountController.updateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);
router.get('/accounts', accountController.getAllAccounts);

// Transaction Type and Category routes
router.get('/trtype/', transactionController.getAllTransactionTypes);
router.get('/trcat/:trtypeId', transactionController.getTransactionCategoriesByType);

module.exports = router;