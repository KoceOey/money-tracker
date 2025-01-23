module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    account_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });

  return Account;
};