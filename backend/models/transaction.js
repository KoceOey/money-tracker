// models/transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tr_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'transaction',
    timestamps: false,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.TransactionType, { foreignKey: 'trtype_id', as: 'type' });
    Transaction.belongsTo(models.Account, { foreignKey: 'from_account_id', as: 'fromAccount' });
    Transaction.belongsTo(models.Account, { foreignKey: 'to_account_id', as: 'toAccount' });
    Transaction.belongsTo(models.TransactionCategory, { foreignKey: 'trcategory_id', as: 'category' });
  };

  return Transaction;
};