// controllers/accountController.js
const { Account } = require('../models');

const addAccount = async (req, res) => {
  try {
    const { account_name, balance, description } = req.body;

    // Basic validation (You should add more robust validation as needed)
    if (!account_name) {
      return res.status(400).json({ error: 'Account name is required' });
    }

    const newAccount = await Account.create({
      account_name,
      balance: balance || 0, // Default to 0 if balance is not provided
      description,
    });

    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error adding account:', error);
    res.status(500).json({ error: 'Failed to add account' });
  }
};

const updateAccount = async (req, res) => {
  try {
    const accountId = req.params.id;
    const { account_name, balance, description } = req.body;

    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await account.update({
      account_name,
      balance,
      description,
    });

    res.json(account);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const accountId = req.params.id;

    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // You might want to add checks or restrictions before deleting an account
    // (e.g., prevent deletion if the account has associated transactions)

    await account.destroy();

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    console.error('Error getting accounts:', error);
    res.status(500).json({ error: 'Failed to get accounts' });
  }
};

module.exports = {
  addAccount,
  updateAccount,
  deleteAccount,
  getAllAccounts,
};