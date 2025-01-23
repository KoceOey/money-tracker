// controllers/transactionController.js
const { Transaction, Account, TransactionType, TransactionCategory } = require('../models');

const addTransaction = async (req, res) => {
  try {
    var { trtype_id, from_account_id, to_account_id, trcategory_id, tr_date, amount, description } = req.body;

    if (trtype_id == 1){
      from_account_id = 0;
    } else if (trtype_id == 2) {
      to_account_id = 0;
    } else {
      trcategory_id = 9;
    }
    console.log(trtype_id, from_account_id, to_account_id, trcategory_id, tr_date, amount, description)
    // Basic validation (You should add more robust validation as needed)
    if (!trtype_id || !trcategory_id || !tr_date || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create the new transaction
    const newTransaction = await Transaction.create({
      trtype_id,
      from_account_id,
      to_account_id,
      trcategory_id,
      tr_date,
      amount,
      description,
    });

    if (trtype_id == 1){
      await Account.increment('balance', { by: amount, where: { account_id: to_account_id } });
    } else if (trtype_id == 2) {
      await Account.decrement('balance', { by: amount, where: { account_id: from_account_id } });
    } else {
      if (from_account_id !== to_account_id) {
        await Account.increment('balance', { by: amount, where: { account_id: to_account_id } });
        await Account.decrement('balance', { by: amount, where: { account_id: from_account_id } });
      }
    }

    res.status(201).json(newTransaction); 
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id; 
    const { trtype_id, from_account_id, to_account_id, trcategory_id, tr_date, amount, description } = req.body;

    // Find the transaction to update
    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        { model: TransactionType, as: 'type' }, 
        { model: Account, as: 'fromAccount' },
        { model: Account, as: 'toAccount' },
        { model: TransactionCategory, as: 'category' },
      ],
    });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const fromAccountId = transaction.fromAccount.account_id;
    const toAccountId = transaction.toAccount.account_id;
    const oldAmount = transaction.amount;

    if (trtype_id == 1){
      await Account.decrement('balance', { by: oldAmount, where: { account_id: toAccountId } });//rollback
      await Account.increment('balance', { by: amount, where: { account_id: to_account_id } });
    } else if (trtype_id == 2) {
      await Account.increment('balance', { by: oldAmount, where: { account_id: fromAccountId } });//rollback
      await Account.decrement('balance', { by: amount, where: { account_id: from_account_id } });
    } else {
      if (from_account_id !== to_account_id) {
        //rollback
        await Account.increment('balance', { by: oldAmount, where: { account_id: fromAccountId } });
        await Account.decrement('balance', { by: oldAmount, where: { account_id: toAccountId } });
        //update
        await Account.increment('balance', { by: amount, where: { account_id: to_account_id } });
        await Account.decrement('balance', { by: amount, where: { account_id: from_account_id } });
      }
    }

    await transaction.update({
      trtype_id,
      from_account_id,
      to_account_id,
      trcategory_id,
      tr_date,
      amount,
      description,
    });

    res.json(transaction); 
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    // Find the transaction to delete
    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        { model: TransactionType, as: 'type' }, 
        { model: Account, as: 'fromAccount' },
        { model: Account, as: 'toAccount' },
        { model: TransactionCategory, as: 'category' },
      ],
    });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    const trtype_id = transaction.type.trtype_id; 

    // Adjust account balances before deleting (reverse the transaction)
    if (trtype_id == 1){
      await Account.decrement('balance', { by: transaction.amount, where: { account_id: transaction.to_account_id } });
    } else if (trtype_id == 2) {
      await Account.increment('balance', { by: transaction.amount, where: { account_id: transaction.from_account_id } });
    } else if (trtype_id == 3) {
      await Account.decrement('balance', { by: transaction.amount, where: { account_id: transaction.to_account_id } });
      await Account.increment('balance', { by: transaction.amount, where: { account_id: transaction.from_account_id } });
    }

    // Delete the transaction
    await transaction.destroy();

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      order: [['tr_date', 'DESC']], // Sort by tr_date in descending order (newest first)
      include: [
        { model: TransactionType, as: 'type' }, 
        { model: Account, as: 'fromAccount' },
        { model: Account, as: 'toAccount' },
        { model: TransactionCategory, as: 'category' },
      ],
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ error: 'Failed to get transactions' });
  }
};

const getSingleTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        { model: TransactionType, as: 'type' }, 
        { model: Account, as: 'fromAccount' },
        { model: Account, as: 'toAccount' },
        { model: TransactionCategory, as: 'category' },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error getting transaction:', error);
    res.status(500).json({ error: 'Failed to get transaction' });
  }
};

const getAllTransactionTypes = async (req, res) => {
  try {
    const transactionTypes = await TransactionType.findAll();
    res.json(transactionTypes);
  } catch (error) {
    console.error('Error getting transaction types:', error);
    res.status(500).json({ error: 'Failed to get transaction types' });
  }
};

const getTransactionCategoriesByType = async (req, res) => {
  try {
    const trtypeId = req.params.trtypeId; // Get the transaction type ID from the URL

    const categories = await TransactionCategory.findAll({
      where: { trtype_id: trtypeId }, 
    });

    res.json(categories);
  } catch (error) {
    console.error('Error getting transaction categories:', error);
    res.status(500).json({ error: 'Failed to get transaction categories' });
  }
};

module.exports = {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getSingleTransaction,
  getAllTransactionTypes,
  getTransactionCategoriesByType,
};