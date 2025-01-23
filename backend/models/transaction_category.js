module.exports = (sequelize, DataTypes) => {
    const TransactionCategory = sequelize.define('TransactionCategory', {
      trcategory_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },{
      tableName: 'transaction_category',
      timestamps: false,
    });
  
    TransactionCategory.associate = (models) => {
      TransactionCategory.belongsTo(models.TransactionType, { foreignKey: 'trtype_id', as: 'type' });
    };
  
    return TransactionCategory;
  };