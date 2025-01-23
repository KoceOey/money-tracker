module.exports = (sequelize, DataTypes) => {
  const TransactionType = sequelize.define('TransactionType', {
    trtype_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'transaction_type',
    timestamps: false,
  });

  return TransactionType;
};